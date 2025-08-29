const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    imageText:{
        type:String,
        required:true
    },
    currentDate:{
        type:Date,
        default:Date.now
    },
    image:{
        type:String
    },
     cloudinary_id: { type: String },
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