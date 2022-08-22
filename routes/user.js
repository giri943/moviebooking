const {Router} = require('express')
const router = Router()
const userAuth = require('../middleware/userAuth')
const adminAuth = require('../middleware/adminAuth')
const UserController = require('../controller/User')

router.post("/sign-up", async (req,res)=>{
    const userData = req.body
    const email = userData.email
    try {
        const emailMatchedUser = await UserController.getUserByEmail(email)
        if(emailMatchedUser){
            return res.status(400).send({error:true, message:"User with same id exists"})
        }
        const role = await UserController.getUserRole(userData.email)
        userData.role=role
        const user = await UserController.createUser(userData)
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(400)
    }
    
})

router.post("/login", async(req, res)=> {
    const userData = req.body
    try {
        const user = await UserController.userlogin(userData)
        res.send(user)    
    } catch (error) {
        console.log(error)
        res.status(400).send({"error":true,"message":"Unable to login"})
    }
    
})

router.get("/get-users", adminAuth, async(req, res)=>{
    try{
        const users = await UserController.getUsers()
        res.status(200).send(users)
    }catch(error){
        console.log(error);
        res.status(400).send({error:true, message:"Unable to find Users"})
    }
})

router.post("/logout", userAuth, async(req, res)=> {
    const user = req.user
    const requestedToken = req.token
    try {
       user.tokens = user.tokens.filter((token)=>{
            return token.token !== requestedToken
       })  
       await user.save()
       res.status(200).send({message:"User Logged Out"})
    } catch (error) {
        console.log(error)
        res.status(400).send({"error":true,"message":"Unable to Logout"})
    }
    
})
router.put("/update", userAuth, async (req, res) => {
    const allowedUpdates = ["firstName", "lastName", "email", "password"]
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((item) => allowedUpdates.includes(item))
    if(!isValidUpdate) {
        return res.status(400).send({message:"Update failed"})
    }
    try {
        const user = req.user
        const updateData = req.body
        updates.forEach((update)=> user[update] = updateData[update])
        const updatedUser = await user.save()
        res.send(updatedUser)
    } catch (error) {
        
    }
})

module.exports = router