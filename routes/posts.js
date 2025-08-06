const mongoose=require('mongoose')


const postSchema=mongoose.Schema({
  postText:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  likes:{
    type:Array,
    default:[]
  }
});

module.exports=mongoose.model('Post', postSchema)