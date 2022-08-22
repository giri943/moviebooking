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


module.exports = router