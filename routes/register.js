var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
var mongoose = require('mongoose');
const user = require('../models/users');
var passwordHash = require('password-hash');


router.post('/', function(req, res, next) {
    //   console.log(req.body)
    //   let pass = passwordHash.generate(req.body.data.password)
    //   console.log(pass)
    //   console.log(passwordHash.verify(req.body.data.password,pass))
    //  return false
    console.log(req.body.user)
      var datetime = new Date();
      var userCreate =  new user.users(req.body.user);
      userCreate.joinDate = datetime
    console.log(userCreate)
      let pass = passwordHash.generate(userCreate.password)
      userCreate.password = pass
      console.log(passwordHash.verify(userCreate.password,pass))
      //return false
      
      user.users.findOne({email:req.body.user.email}, function(err, users) {
        if (err)  res.json({status:"failure",statusCode:100,error:err});
        
        if(users){
          console.log(users)
          res.json({status:"failure",statusCode:100,error:"Email already exists!!"});
        }else{
          user.users.findOne({userName:req.body.user.userName}, function(err, users) {
            if (err)  res.json({status:"failure",statusCode:100,error:err});
        
            if(users){
              console.log(users)
              res.json({status:"failure",statusCode:100,error:"Username already exists!!"});
            }
            else{
              userCreate.save(function (err, user) {
                if (err) res.json({status:"failure",statusCode:100,error:err});
            
                res.json({status:"success",statusCode:200,data:user});
              });
            }
          })
        }
      });
      
    });

module.exports = router;
