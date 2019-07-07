import bcrypt from 'bcryptjs'
import {transformUser} from './helper'
import User from '../../models/User'
import JWT from 'jsonwebtoken'
module.exports = {
   
    createUser : async (args) => {
        try{
            const existingUser = await User.findOne({email : args.userInput.email });
           
            if(existingUser) return new Error("User already exists!!")
           
            const hashedPassword = await bcrypt.hash(args.userInput.password,12);
            const user = new User({
                email: args.userInput.email,
                password:hashedPassword
            })
            const newUser = await user.save(); 
            return {...newUser._doc,password:null,_id:newUser.id}
        }
        catch{error => {throw error}}
    },
    users : async () => {
        try {
            const users = await User.find();
            if(!users) throw new Error("No users found!!")
            return users.map(user => transformUser(user))
        }
        catch{error => {throw error}}
                        
    },
    login: async ({email,password}) => {
        const user = await User.findOne({email : email})
        if(!user) throw new Error("No user found")
        const isEqual = await bcrypt.compare(password,user.password)
        if(!isEqual) throw new Error("Password is incorrect")
        const token = JWT.sign({userId:user.id,email:user.email},'somesupersecretkey',
        {
          expiresIn: '1h'
        })
        return {userId : user.id, token : token , tokenExpiration: 1}
    }
   
}