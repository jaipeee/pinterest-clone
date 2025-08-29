const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(" MongoDB Error: ", err));

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
