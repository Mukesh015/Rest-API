const express = require('express')
const mongoose = require('mongoose')
const users = require('./user_data.json')

const app = express();
const PORT = 3000;
app.use(express.json())

//Schema
mongoose
  .connect('mongodb+srv://Mukesh:Mukesh%402002@learn-mongodb.yxla1ty.mongodb.net/Practice')
  .then(()=>console.log("DB connected successfully"))
  .catch((err)=>console.log("DB connection failed",err))

const userSchema = new mongoose.Schema({
  id:{
    type:Number,
    // required:true,
    // unique:true
  },
  username:{
    type:String,
    // required:true,
  },
  email:{
    type:String && Number
    // required:true,
    // unique:true
  },
  city:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  }
})

//using this var we can use mongo database
const User = mongoose.model('user',userSchema)

//All Routes

//For desktop user
app.get('api/user',(req,res)=>{
  return res.json(users);
})

//For mobile user
app.get('/user',(req,res)=>{
  const html =` <ul> ${users.map((user)=>`<li>${user.username}</li>`).join("")}</ul> `;
  res.send(html)
})

//Getting the user with a unique property
app.get('/api/user/:id',(req,res)=>{
  const id = Number(req.params.id);
  const user = users.find((user)=>user.id === id); 
  return res.json(user) 
})

//Creating a new user
app.post ('/api/user',async(req,res)=>{
  const body = req.body;
  if(!body||
    !body.id||
    !body.username||
    !body.email||
    !body.city||
    !body.age
    ){
    console.log("Invalid user format")
    return res.status(400).json({msg:"All fields are required"})
  }
  else{
  const result = await User.create({
    id:body.id,
    username:body.username,
    email:body.email,
    city:body.city,
    age:body.age,
  })
  return res.status(201).json('Successfully created',result)
  }
})

app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`)  
})