const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    postText:{
        type:String,
        required:true
    },
    currentDate:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    likes:{
        type: Array,
        default:[]
    },
    
})

module.exports=mongoose.model('Posts', postSchema)