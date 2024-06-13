const mongoose=require("mongoose")
const cors=require("cors")
const express=require("express")
const bcrypt=require("bcryptjs")
const {usermodel}=require("./models/bloguser")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Richi2001:R1CH1R0Y@cluster0.ulfkc.mongodb.net/BlogUserDB?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

app.post("/signup",async(req,res)=>{
    let input=req.body
    let hashedPswd=await generateHashedPassword(input.pswd)
    input.pswd=hashedPswd
    let user=new usermodel(input)
    console.log(user)
    user.save()
    res.json({status:"success"})
})



app.listen(8435,()=>{
    console.log("server started")
})