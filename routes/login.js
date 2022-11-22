var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
var mongoose = require('mongoose');
const users = require('../models/users');
var passwordHash = require('password-hash');


/* login user. */ 
router.post('/', function(req, res, next) {
  console.log("req.body")
  if(!passwordHash.isHashed(req.body.user.password)){
    console.log(req.body)
    var hashedPassword = passwordHash.generate(req.body.user.password);
    console.log(hashedPassword)
    users.users
    .find({'userName':req.body.user.userName},function (err, users) {
    
      if (err) {
          res.json({status:"failure",statusCode:100,data:err});
      }else if(users.length==0){
        res.json({status:"failure",statusCode:100,data:"Invalid Credentials!!!"});
      }
      else{
          if(passwordHash.verify(req.body.user.password, users[0].password)){
            console.log(users)
            res.json({status:"success",statusCode:200,data:users});
          }else{
            res.json({status:"failure",statusCode:100,data:"Invalid Credentials!!!"});
          }
      }
      
    
    });
  }else{
    
    users.users
    .find({'userName':req.body.user.userName},function (err, users) {
    
      if (err) {
          res.json({status:"failure",statusCode:100,data:err});
      }else if(users.length==0){
        res.json({status:"failure",statusCode:100,data:"Invalid Credentials!!!"});
        }
        else{
          if(passwordHash.verify(data.password, users[0].password)){
            console.log(users)
            res.json({status:"success",statusCode:200,data:users});
          }
        }
      
    
    });
  }
});




// router.post('/resetpass', function(req, res, next) {
//   console.log(req.body);
//   let pass = passwordHash.generate(req.body.password)
//   console.log(pass);
//   user.users.findOneAndUpdate(
//     { _id: req.body._id },
//     {
//       $set: { password: pass },
//     },
//     {
//       returnOriginal: false,
//       upsert: true,
//       useFindAndModify:false
//     },function(err,result){ 
//       if (err) {
//         res.json({status:"failure",statusCode:100,error:'Invalid User!!!'});
//       }
//       else{
//     console.log(result);
//       res.json({status:"success",statusCode:200});
//       }
//     })
// })

// router.post('/forgotpass', function(req, res, next) {
//   let data = req.body
//   data.admin=true
//   data.superadmin = true
//   console.log(data)
//   user.users.find(req.body,{password:0,planid:0,admin:0,deactivate:0}, function(err, user) {
//     if (err) {
//       res.json({status:"failure",statusCode:100,data:err});
//   }else if(user.length==0){
//     res.json({status:"failure",statusCode:100,message:"Could Not find a User!!!",data:user});
//     }
//     else{

//    console.log(user[0]._id);
//      var a =  sendEmail(user[0].email,
//         "Reset Password Link!!!",
//         '<b>Please click on </b><a href="'+email.adminurl+'/resetpass/'+user[0]._id+'">Link</a> to reset the password')
//         a.then((result) => { 
//        if(result){
//         res.json({status:"success",statusCode:200,data:user});
//        }
//        else{
//         res.json({status:"failure",statusCode:100,message:"There was some error in youyr request!!!",data:[]});
//        }
//         }).catch((err) => {
//           res.json({status:"failure",statusCode:100,message:"Could Not Send Email!!!",data:err});
//         });
     
   
      
      
//     }
//   });
// });


module.exports = router;
