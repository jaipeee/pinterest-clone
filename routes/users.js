const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://localhost:27017/pinterest_clone')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    posts:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }],bio:{
        type:String
    },
    dp:{
        type:String

    },
    email:{
        type:String,
        unique:true
 
    },
    fullname:{
        type:String
    }
})

userSchema.plugin(plm);
module.exports=mongoose.model('Users', userSchema)