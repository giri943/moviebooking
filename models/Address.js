const mongoose = require('mongoose')
const addressSchema = mongoose.Schema({
    "customerId":{
        type:mongoose.Schema.Types.ObjectId
    },
    "name":{
        type:String,
        required:true
    },
    "contactNumber":{
        type:String,
        required:true
    },
    "street":{
        type:String,
        required:true
    },
    "landMark":{
        type:String
    },
    "city":{
        type:String,
        required:true
    },
    "state":{
        type:String,
        required:true
    },
    "zipcode":{
        type:String,
        required:true
    }

})

const Address = mongoose.model("address", addressSchema)
module.exports = Address