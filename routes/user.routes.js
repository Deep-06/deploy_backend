const {UserModel}=require("../model/user.model")
const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
//const {blacklist}=require("../blaklist")
//const { body, validationResult  } =require("express-validator") ;
const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const {username,email,pass}=req.body
    try{
        bcrypt.hash(pass, 4, async(err, hash) =>{
         if(err){
            res.status(200).send({"error":err})
         }else{
            const user=new UserModel({username,email,pass:hash})
            await user.save()
            res.status(200).send({"msg":"The new user has been registered","registeredUser":req.body})
         }
        });
    }catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
     const user= await UserModel.findOne({email})
     if(user){
        bcrypt.compare(pass, user.pass, (err, result) =>{
            if(result){
                const token=jwt.sign({userID:user._id,username:user.username}, 'masai')
//console.log(token)
                res.status(200).send({"msg":"Login successful!", "token":token})
            }else{
                res.status(200).send({"msg":"Wrong Credentials"})
            }
        })
     }
    }catch(err){
        res.status(400).send({"error":err}) 
    }
})

// userRouter.get("/logout",async(req,res)=>{
//     const token=req.headers.authorization?.split(" ")[1]
//     try{
//      //blacklist.push(token)
//      res.status(200).send({"msg":"User has been logged out"})
//     }catch(err){
//         res.status(400).send({"error":err}) 
//     }
// })
module.exports={
    userRouter
}