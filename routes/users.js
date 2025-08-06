const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pinterest_clone');

const userSchema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  post:[],
  db:{
    type:String
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  fullName:{
    type:String,
    required:true
  }
})

module.exports=mongoose.model('User',userSchema)