const Address = require('../models/Address')

const createAddress = (addressData) => {
    return new Promise (async (resolve, reject) => {
        try {
            const address = new Address({...addressData})
            const created = address.save()
            resolve(created)
        } catch (error) {
            reject(error)
        }
        
    })
}

const getAddressById = (userId) =>{
    return new Promise(async (resolve, reject)=>{
        try {
            const foundAddress = await Address.find({customerId:userId})
            resolve(foundAddress)    
        } catch (error) {
            reject(error)
        }
    })
}

const updatedAddressByCustomerId = (addressId, updateData) => {
    return new Promise(async (resolve, reject) =>{
        Address.findByIdAndUpdate({_id:addressId}, {...updateData},{new:true}, (err, updated)=> {
            if(err) {
                console.log(err);
                reject({status: false, message: "Couldn't update the Address"})
            }
            //console.log(updated);
            resolve(updated)
        })
    })
}

module.exports = {
    createAddress,
    getAddressById,
    updatedAddressByCustomerId
}