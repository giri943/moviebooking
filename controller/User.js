const User = require('../models/User')
const bcrypt = require('bcryptjs')

const  getUserRole = (email) => {
    const admins = ['giri943@gmail.com']
    if(admins.includes(email)){
        return "admin"
    }else{
        return "customer"
    }
}
const createUser = (userData) => {
    return new Promise(async (resolve, reject)=> {

    try {
        const user = new User({...userData })
        
        await user.save()
        const token = await user.generateAuthToken()
        resolve({user:user.getPublicProfile(), token})


    } catch (error) {
        reject(error)
    }
        
    })
}

const userlogin = (userData) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await User.findByCredentials(userData.email, userData.password)
            const token =await user.generateAuthToken()
            resolve({user:user.getPublicProfile(), token})    
        } catch (error) {
            reject(error)
        }
        
    })
}

const getUsers = () => {
    return new Promise(async (resolve, reject) => {
      User.find().exec(async (err, foundData) => {
        if (err) {
          reject({ message: "Error fetching the User Data", status: false })
        }
        
        resolve(foundData)
  
      })
    })
  }

  const getUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
      User.findOne({email}).exec(async (err, foundData) => {
        if (err) {
          reject({ message: "Error fetching the User Data", status: false })
        }
        
        resolve(foundData)
  
      })
    })
  }

  const findUserById = (userId) => {
    return new Promise(async (resolve, reject)=> {
      try {
        const user = await User.findById(userId)
        resolve(user)
      } catch (error) {
        reject(error)
      }

    })
  }


module.exports ={
    createUser,
    getUserRole,
    userlogin,
    getUsers,
    getUserByEmail,
    findUserById
}