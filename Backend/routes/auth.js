const express = require("express");
const User = require("../models/user");
const bcrypt=require('bcryptjs');
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post(
  "/createwithpa",[ body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("token").exists(),],
  async (req, res) => {
    // console.log("hello in createuser with pa");
    // res.send("kkkkkkkk") 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    let user= await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({success:false,error:"user already exists "});
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    if(req.body.date){
      let d=new Date(req.body.date);
      // d=d.toLocaleDateString();
      user = await User.create({
        email: req.body.email,
        password: hash,
        token: req.body.token,
        date:d
      }).then((user) => {
        return user;
      });
      
    }
    else{
      user = await User.create({
        email: req.body.email,
        password: hash,
        token: req.body.token,
      }).then((user) => {
        return user;
      });
      
    }
    
    res.json({success:true});
    // res.json(user)





 
  }
);
router.post('/login',body('email').isEmail(),body('password').exists(),async (req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false,error: "Invalid Credentials" });
    }
    let user= await User.findOne({email:req.body.email});
    if(!user){
      return res.status(400).json({success:false,error:"user does not exists "});
    }
    if(bcrypt.compareSync(req.body.password, user.password)){
      
      return res.json({success:true,token:user.token,date:user.date});
    }
    else{
      return res.status(400).json({success:false,error:"Invalid Credentials"})
    }
})
router.put('/update',body('email').isEmail(),async (req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false,error: "Invalid Credentials" });
    }
    let user= await User.findOne({email:req.body.email});
    if(!user){
      return res.status(400).json({success:false,error:"user does not exists "});
    }
    const d=new Date();
    let nuser=await User.findOneAndUpdate({email:req.body.email},{token:req.body.token,date:d},{new:true})
      
        
      return res.json({success:true,token:nuser.token});
     
    
    
})


module.exports = router;
