var express = require('express');
var router = express.Router();
// var deliver = require('./socket_deliver');
module.exports=function(io){
  router.get('/',function(req,res,next){
      res.render('index');
  })
  // router.get('/index',function(req,res,next){
  //     deliver(io);
  //     next();
  // })
  router.get('/index',function(req,res,next){
      res.render('entry');
  })
  return router;
}
