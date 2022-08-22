const {Router} = require('express')
const router = Router()
const AddressController = require('../controller/Address')
const userAuth = require('../middleware/userAuth')

router.post("/add-address", userAuth, async(req, res)=> {
    const addressData = req.body
    const customerId = req.user._id
    addressData.customerId = customerId
    try {
        const createdAddress = await AddressController.createAddress(addressData)
        res.status(200).send({status:true, createdAddress})
    } catch (error) {
        console.log(error);
        res.status(400).send({error:true, message:"Address creation failed"})
    }
})

router.get("/get-address", userAuth, async(req, res) => {
    const userId = req.user._id
    try {
        const address = await AddressController.getAddressById(userId)
        res.status(200).send(address)
    } catch (error) {
        console.log(error);
        res.status(400).send({error:true, message:"Address not found"})
    }
})

router.put("/update-address/:id", userAuth, async(req, res) => {
    const addressId = req.params.id
    const updateData = req.body
    if(!updateData.name){
       return res.status(400).send({message:"Please Provide the name"})
    }
    if(!updateData.contactNumber){
        return res.status(400).send({message:"Please Provide the Contact number"})
    }
    if(!updateData.street){
        return res.status(400).send({message:"Please Provide the Street name"})
    }
    if(!updateData.landmark){
        return res.status(400).send({message:"Please Provide the Landmark"})
    }
    if(!updateData.city){
        return res.status(400).send({message:"Please Provide the city"})
    }
    if(!updateData.state){
        return res.status(400).send({message:"Please Provide the state"})
    }
    if(!updateData.zipcode){
        return res.status(400).send({message:"Please Provide the zipcode"})
    }
    try {
        const updatedAddress = await AddressController.updatedAddressByCustomerId(addressId, updateData)
        res.status(200).send({message:"success", updatedAddress})
    } catch (error) {
        
    }

     
})


module.exports = router