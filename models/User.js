const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')

var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        lowercase:true
    },
    lastName:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
        
    },
    password:{
        type:String,
        unique:true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a strong password");
            }
        }

    },
    tokens:[{
        token:{
            type:String,
            required:true,
      
            }
    }],
    role:{
        type:String,
        required:true,
        default:"customer",
        enum:["admin","customer"]
    }

})

userSchema.methods.getPublicProfile = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject

}
//Generates JWT token and saves to the userSchema.
userSchema.methods.generateAuthToken = async function() {
 const user = this
 const token =jwt.sign({_id:user._id.toString() }, process.env.JWT_SECRET, {expiresIn:"1 day"})
 user.tokens = user.tokens.concat({token})
 await user.save()
 return token
}
//For finding the user data using user credentials(email, password) and returns user data
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email:email})
    //console.log(user);
    if(!user){
        throw new Error("Unable to login")
    }
    const passwordMatchedUser = await bcrypt.compare(password, user.password)
    if(!passwordMatchedUser){
        throw new Error("Incorrect Password")
    }
    return user
}
//For Generating the HASD password before save() and saves the value to password field
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        try{
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(this.password, salt);
            return next();
        }catch (error) {
            return next(error)
        }
        
    }
    next()
})
userSchema.set("timestamps", true);
const User = mongoose.model("user",userSchema)
module.exports = User