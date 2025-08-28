var express = require('express');
var router = express.Router();
const userModel=require('./users')
const postModel=require('./posts')
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const upload = require('./multer')

passport.use(new localStrategy(userModel.authenticate()))

const isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login')
}

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/delete',isLoggedIn, async (req,res,next)=>{
    const user = await userModel.findOne({
       username: req.session.passport.user
    }).populate('posts')
    res.send(user.posts)
})

router.get('/feed', isLoggedIn, async function(req, res, next) {
  const posts =await postModel.find().sort({currentDate:-1})
  res.render('feed',{posts});
});

router.post('/upload',isLoggedIn, upload.single('file'), async function(req, res, next) {
  if(!req.file){
    return res.status(404).send("no file uploaded")
  }
  const user = await userModel.findOne({username: req.session.passport.user})
  const post=await postModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    user:user._id
  })
  user.posts.push(post._id)
  await user.save(post)
  res.redirect('/profile')
});

router.post('/dp', isLoggedIn, upload.single('pp'), async (req,res,next)=>{
  if(!req.file){return res.status(404).send('something went wrong')}
  const user = await userModel.findOne({username: req.session.passport.user})
  user.dp=req.file.filename
  await user.save()
  res.redirect("/profile")
})

router.get('/login', function(req, res, next) {
  res.render('login',{error: req.flash('error')});
});

 
router.get('/profile',isLoggedIn,async function(req, res, next) {
  const user= await userModel.findOne({ username:req.session.passport.user })
  .populate('posts')
  res.render('profile',{username:user });
});

router.post('/register', (req,res,next)=>{
  const {username, email, fullname} = req.body
  const userdata = new userModel({username, email, fullname })
  userModel.register(userdata, req.body.password)
  .then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('profile')
    })
  })
});

router.post('/login',passport.authenticate('local',{
  successRedirect: '/feed',
  failureRedirect: '/login',
  failureFlash:true
}),(req,res,next)=>{}) 


router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err){ return next(err); }
    res.redirect('/login');
  });
});

module.exports = router; 