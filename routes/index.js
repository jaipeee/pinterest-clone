var express = require('express');
var router = express.Router();
const userModel=require('./users')
const postModel=require('./posts')

router.get("/createUser",async(req,res,next)=>{
  let data=await userModel.create({
    username:"jaipee",
  password:"jaipee",
  post:[],
  email:"jaipee@gmail.com",
  fullName:"jaipratap"
  })
  res.send(data)
})
router.get('/createpost',async(req,res,next)=>{
  let postdata=await postModel.create({
    postText:"thisIsPost"
  })
  res.send(postdata)
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
