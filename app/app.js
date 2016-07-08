
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
var names=[],users=[];
io.on('connection',function(socket){
    //首次进入设置昵称
    socket.on('set name',function(user){
        console.log('set name');
        names.push(user.name);
        var data={
          curName:user.name,
          users:user
        }
        console.log(data);
        io.sockets.emit('logined',data);
        socket.emit('save cookie',user);
    })
    //首次进入未设置昵称
    socket.on('not set name',function(profileImg){
        console.log('not set name')
        var ykname='游客'+(parseInt(Math.random()*10000));
        names.push(ykname);
        users.push({name:ykname,profileImg:profileImg})
        var data={
          curName:ykname,
          users:users
        }
        console.log(data);
        io.sockets.emit('logined',data);
        socket.emit('save cookie',{name:ykname,profileImg:profileImg});
    })
    //已设置昵称用户再次进入
    socket.on('logined',function(user){
        console.log('logined')
        socket.user=user;
        users.push(user);
        names.push(user.name);
        var data={
          curName:user.name,
          users:users
        };
        console.log(data);
        io.sockets.emit('logined',data);
    })
    socket.on('modify name',function(data){
        var index=names.indexOf(data.lastName);
        names.splice(index,1);
        var delUser=users.splice(index,1);
        console.log('delete',delUser);
        console.log('users:',users);
        names.push(data.curName);
        var curUser={name:data.curName,profileImg:delUser[0].profileImg}
        users.push(curUser);
        var res={
            lastName:data.lastName,
            curName:data.curName,
            users:users
        }
        console.log(res)
        io.sockets.emit('modify name',res);
        socket.emit('save cookie',curUser);
    })
    //发送消息
    socket.on('msg',function(data){
        console.log('msg:',data);
        io.sockets.emit('msg',data);
    })
    socket.on('logout',function(name){
      var index=names.indexOf(name);
      names.splice(index,1);
      users.splice(index,1);
      var data={
        curName:name,
        users:users
      }
      console.log(data);
      io.sockets.emit('logout',data)
    })
  console.log('one member conneted!');
})
// app.get('/',function(req,res){
//   console.log('get path: /');
//   res.sendFile(__dirname+'/public/index.html')
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

var viewRoutes = require('./routes/viewRoutes');
app.use('/',viewRoutes(app));
//这个需要放在routes配置后面，否则会去渲染public下的index.html文件
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
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// app.listen('3300',function(){
//  console.log('express app has runed at port:3300')
// })
