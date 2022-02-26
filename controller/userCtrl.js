const Users = require('../models/userModel')
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req,res)=>{
        try{
            const {username,email,password} = req.body;
            const user = await Users.findOne({email:email})
            if(user){
                return res.status(400).json({msg:"The email already exits"})
            }
            const passwordHash = await bycrpt.hash(password,10)
            const newUser = new Users({
                username,
                email,
                password:passwordHash
            })
            await newUser.save()
            res.json({msg:"sign up success"})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    userlogin: async (req,res)=>{
        try{
            const {email,password} = req.body
            const user = await Users.findOne({email:email})
            if(!user){
                return res.status(500).json({msg:"User does not exsit"})
            }
            const isMatch = await bycrpt.compare(password,user.password) 
            if(!isMatch) return res.status(500).json({msg:"password incorrect"})

            //payload
            const payload = {id: user._id,name: user.username}
            const token = jwt.sign(payload,process.env.TOKEN_KEY,{expiresIn:'1d'})
            res.json({token})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    verfiedToken: async (req,res)=>{
        try{
            const token = req.header('Authorization')
            if(!token) return res.send(false)
            
            jwt,jwt.verify(token,process.env.TOKEN_KEY, async (err,verified)=>{
                if(err) return res.send(false)

                const user = await Users.findById(verified.id)
                if(!user) return res.send(false)

                return res.send(true)
            })
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = userCtrl