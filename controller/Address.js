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

module.exports = {
    createAddress,
    getAddressById
}