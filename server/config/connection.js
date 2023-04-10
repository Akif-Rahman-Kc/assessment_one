const { Router } = require('express')
const { set, connect } = require('mongoose')
const router = Router();

const mongoDB = "mongodb+srv://Akif:akif1011@cluster0.b6f7vug.mongodb.net/my_web_app";
set('strictQuery', false);
connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log("Connection failed",err);
})

module.exports = router;