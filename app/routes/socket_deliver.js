
var merge=require('merge');

function MK_CommonData(type,users){

}

module.exports=function deliver(app,io){
  console.log('---------->>>>>>>>>>');
  var clientIDs=[];
  var SocketUsers=[];
  function ADD_USER(clientUser){
    var gUser =GetUserByID(clientUser.uid);
    if(gUser===''){
      SocketUsers.push(clientUser)
    }
  }
  function GEN_JSON(xtype,xuser,xmsg,sysMsg){
    var users=xtype.match(/msg/)?'':SocketUsers,
        msg=xmsg?xmsg:'',sysMsg=sysMsg?sysMsg:'';
    var commonData= {
      type:xtype,
      time:'2016-5-16 11:00',
      users:users,
      sysMsg:sysMsg
    };
    return merge(commonData,{activeUser:xuser},{msg:msg})
  }
  function GetUserByID(uid){
    var cu = SocketUsers.find(function(item){
        return item.uid==uid
    })
    return cu?cu:'';
  }
  function MODIFY_USER(origin,dest){
      var index=SocketUsers.indexOf(origin);
      if(index>-1) {
        SocketUsers[index]=dest;
      }
  }
  return function deliver(req, res, next){
    //重要：有n个正在连接的用户，那么每次刷新页面进来的时候，都会执行一遍 io.on('connection',function(){})，
    //就是重复注册了，所以on('connextion',function(){})回调函数里的代码会多次执行，因为顺序不定，
    //带来的问题就是可能无法确切识别客户端的cookie身份
    //需要屏蔽多次io注册事件，如果连接已经建立，则直接执行next()
    io.sockets.on('connection',function(socket){
      var clientID=socket.conn.id;
      var activeUID=req.cookies.DM_UID,cookieUID=req.cookies.DM_UID;
      console.log('==============>COOKIE:',activeUID);
      if(clientIDs.indexOf(clientID)>-1){
        return ;
      }else{
        clientIDs.push(clientID);

      socket.on('logined',function(data){
          var GUID=clientID.substr(12,5)+''+new Date().getTime().toString().substr(8);
          var user={};
          if(data.type=='hasUser'){
              user=data.user;
          }else if(data.type=='hasName'){
             user={
               uid:GUID,
               name:data.name,
               profile:'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/icon/weather/aladdin/png_18/a0.png'
             };
          }else{
            user={
              uid:GUID,
              name:'游客'+GUID,
              profile:'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/icon/weather/aladdin/png_18/a0.png'
            }
          }
          ADD_USER(user);
          var scdata=GEN_JSON('logined',user);
          console.log('LOGINED DATA',scdata);
          if(typeof cookieUID === 'undefined'){
              console.log('SET_COOKIE:',user);
              socket.emit('set-cookie',user);
          }
          console.log('LOGINED COOKIEID（76）:',cookieUID);
          io.sockets.emit('logined',scdata);
      })
      socket.on('modify-user',function(data){
        console.log('activeUID:',data.uid)
          var cuser=GetUserByID(data.uid);
          var destUser={
            uid:cuser.uid,
            name:data.name,
            profile:cuser.profile
          };
          console.log('CUSER',cuser);
          console.log('DESTUSER',destUser)
          MODIFY_USER(cuser,destUser);
          var scdata=GEN_JSON('modify-user',destUser,'',{originUser:cuser,destUser:destUser})
          io.sockets.emit('modify-user',scdata);
          socket.emit('set-cookie',destUser);
      })
      //发送消息
      socket.on('msg',function(data){
        console.log('XXXXXXXXXXXXXXXXX',data.uid);
          var user=GetUserByID(data.uid);
          var scdata=GEN_JSON('msg',user,data.msg);
          console.log('MSG:',scdata);
          io.sockets.emit('msg',scdata);
      })
      socket.on('logout',function(data){
           console.log('DISCONNECT!! UID(107):',data.uid,data);
           var cuser=GetUserByID(data.uid);
           var index = SocketUsers.indexOf(cuser);
           SocketUsers.splice(index,1);
           console.log('logoutCUSER:',cuser);
           console.log('SOCKET_USERS:',SocketUsers);
           var data=GEN_JSON('logout',cuser,'','')
           console.log('logoutDATA:',data);
           io.sockets.emit('logout',data);
      })
      // socket.on('disconnect',function(){
      //     console.log('DISCONNECT!!!');
      //     var cuser=GetUserByID(cookieUID);
      //     var index = SocketUsers.indexOf(cuser);
      //     SocketUsers.splice(index,1);
      //     console.log('logoutCUSER:',cuser);
      //     console.log('SOCKET__________User:',SocketUsers);
      //     var data=GEN_JSON('logout',cuser,'','')
      //     console.log('logoutDATA:',data);
      //     socket.broadcast.emit('logout',data);
      // })
    }
      console.log('one member conneted!');
    })
  next()
  }
}
