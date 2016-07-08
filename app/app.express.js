
var express = require('express'),
    path = require('path'),
   logger = require('morgan'),
   cookieParser = require('cookie-parser'),
   bodyParser = require('body-parser'),
   http = require('http'),
   Socket = require('socket.io');
var app=new express();
app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var server=http.createServer(app);
server.listen(3300);
var io = Socket.listen(server);

console.log('express app has runed at port:3300');

// app.get('/',function(req,res){
//   console.log('get path: /');
//   res.sendFile(__dirname+'/public/index.html')
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
var deliver = require('./routes/socket_deliver');
app.use('/index',deliver(app,io))
var viewRoutes = require('./routes/viewRoutes');
app.use('/',viewRoutes(app));
//public这个需要放在routes配置后面，否则会去渲染public下的index.html文件
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  // 设置所有HTTP请求的超时时间
  req.setTimeout(5000)
  // 设置所有HTTP请求的服务器响应超时时间
  res.setTimeout(5000)
  next();
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  // app.use(function(err, req, res, next) {
  //   res.status(err.status || 500);
  //   // res.render('error', {
  //   //   message: err.message,
  //   //   error: err
  //   // });
  //   console.log('ERROR!')
  // });
}

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

//TODO:nodejs server app.express.js->  http://webpack.github.io/docs/webpack-dev-server.html
// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config.js');
//
// new WebpackDevServer(webpack(config), {
//    hot: true,
//    historyApiFallback: true,
//    proxy: {
//      "*": "http://localhost:3300"  //localhost:3001的所有请求将会被代理到localhost:3300
//    }
// }).listen(3001, 'localhost', function (err, result) {
//    if (err) {
//      console.log(err);
//    }
//
//    console.log('Listening at localhost:3001');
// });
