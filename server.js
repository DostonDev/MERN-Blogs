const experss = require('express')
const app = experss()
const mongooes = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const userRouter = require('./routes/userRouter')
const blogRouter = require('./routes/blogRouter')





//use
app.use(cors())
app.use(experss.json())




//routers
app.use('/users',userRouter)
app.use('/api/blogs',blogRouter)



















//connect db

const URL = process.env.DB_ATLAS
mongooes.connect(URL,{useNewUrlParser:true},(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connected");
    }
})









// listen 

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Listen");
})