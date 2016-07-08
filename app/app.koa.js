'use strict';

var app = require('koa')(),
    Router=require('koa-router'),
    SocketIO=require('socket.io'),
    http=require('http');

// logs
var logger = require('koa-logger');
app.use(logger());
//使用Jade作为模板引擎
//必须放在router使用之前
var views = require('koa-views');
app.use(views(__dirname +'/views', 'jade', {}));
//co-views 渲染视图
// var views = require('co-views');
// var render = views('tpls', {
//     map: { html: 'swig' },//html后缀使用引擎
//     default: "jade"//render不提供后缀名时
// });
// var userInfo = {
//     name: 'tobi',
//     species: 'ferret'
// };
// var html;
// html = render('user', { user: userInfo });
// html = render('user.jade', { user: userInfo });

//router
var router=require('koa-router')();
app.use(router.middleware())
// static file
var serve = require('koa-static');
app.use(serve('./public'));

router.get('/',function *(next){
  this.response.body = 'Hello World!';
  yield next;
})
router.get('/index',function *(next){
  console.log(this);
  this.response.status=200;
  // this.response.body = 'Hello World!from index';
  yield  this.render('index')
})
//router use的另一种写法，需要放在最后，
//与app.use(router.middleware())区别不详，保留注释
// app
//   .use(router.routes())
//   .use(router.allowedMethods());

// 这一行代码一定要在最后一个app.use后面使用
var server = http.Server(app.callback());
var socket = SocketIO(server);

socket.on('connection',function(){
  console.log('user connected');
})

app.listen(3300,function(){
  console.log('koa app has runed at localhost:3300')
});
