var express = require('express');
var router = express.Router();
const userModel=require('./users')
const postModel=require('./posts')
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');

passport.use(new localStrategy(userModel.authenticate()))

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/a/:username', function(req, res) {
  res.render('profile');
});
router.get('/login', function(req, res, next) {
  res.render('login',{error:req.flash('error')});
});

const isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login')
}
 
router.get('/profile',isLoggedIn,async function(req, res, next) {
  const user= await userModel.findOne({
    username:req.session.passport.user
  })
  res.render('profile',{username:user});
});

router.post('/register', (req,res,next)=>{
  const {username, email, fullname } = req.body
  const userdata = new userModel({username, email, fullname})
  userModel.register(userdata, req.body.password)
  .then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('profile')
    })
  })
});

router.post('/login',passport.authenticate('local',{
  successRedirect: '/profile',
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