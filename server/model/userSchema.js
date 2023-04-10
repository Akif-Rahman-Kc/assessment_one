const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    phoneNo:{
        required: true,
        type: String,
        trim: true
    },
    otp:{
        type: String,
        trim: true
    },
    image:{
        type: String,
    },
    
},{ timestamps: true })

module.exports = model('users',userSchema);