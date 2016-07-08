requirejs.config({
    baseUrl:"/js/"
});
define(['lib/cookie'],function(cookie) {
    var G={};
    var tximg=cookie.get('lehi_nickname')?'/images/xiaoxin.jpg':'/images/wanzi.jpg';
    var enterTips=cookie.get('lehi_nickname')?'哗哗！飞入帅哥一枚，快来围观..':'哇塞! 惊现美女一枝，注意不要讲黄段子了..';
    var enterTpl = '<div class="event ui"><div class="content">'
        + '<div class="summary"><a href="">{{name}}</a> 加入聊天室'
        + '<div class="date">{{time}}</div></div><div class="extra text">'+enterTips+'</div> <div class="meta"> <a href="" class="like">'
        + '<i class="like icon"></i> 新人报到 </a> </div> </div> </div>';
    var chatTpl = '<div class="comment">' +
        '<a href="" class="avatar"> <img src="{{tximg}}" alt=""/>' +
        '</a> <div class="content"> <a href="" class="author">{{name}}</a>' +
        '<div class="metadata">{{time}}</div> <div class="text">{{content}}</div>' +
        '</div> <div class="divider ui"></div> </div>';
    var uslistTpl='<div class="item"> <img class="ui avatar image" src="{{tximg}}">'+
        '<div class="content"> <a class="header">{{name}}</a> </div> </div>';
    var socket = io.connect();
    socket.on('logined', function (data) {
        console.log(data);
        var html='';
        $(data.users).each(function(k,v){
            html+=uslistTpl.replace('{{name}}',v.name).replace('{{tximg}}',v.profileImg);
        })
        $('.user-list .list').html(html);
        $('#online-nums').text(data.users.length);
        //--sys-msg
        $('.main-panel .sys-msg').append(enterTpl.replace('{{name}}', data.curName).replace('{{time}}',
        new Date().toLocaleTimeString()));
        $('.sys-msg').scrollTop($('.sys-msg')[0].scrollHeight);
    })
    socket.on('msg', function (data) {
        $('.main-panel .comments').append(chatTpl.replace('{{tximg}}', data.user.profileImg).replace('{{content}}', data.msg).replace('{{name}}', data.user.name).replace('{{time}}', new Date().toLocaleTimeString()));
        $('.chat-msg').scrollTop($('.chat-msg')[0].scrollHeight);
    })
    socket.on('save cookie',function(data){
        cookie.set('LGUS',data.name);
        cookie.set('LGUSIMG',data.profileImg);
    })
    socket.on('modify name',function(data){
      var con ='<div class="event ui"><div class="content">'+
        '<div class="summary"><a href="">'+data.lastName+'</a> 将昵称修改为：'+
        '<a href="">'+data.curName+'</a></div></div></div>';
      $('.main-panel .sys-msg').append(con);
      $('.sys-msg').scrollTop($('.sys-msg')[0].scrollHeight);
      var html='';
      $(data.users).each(function(k,v){
          html+=uslistTpl.replace('{{name}}',v.name).replace('{{tximg}}',v.profileImg);
      })
      $('.user-list .list').html(html);
      $('#online-nums').text(data.users.length);
    })
    socket.on('logout',function(data){
      var con ='<div class="event ui"><div class="content">'+
        '<div class="summary"><a href="">'+data.curName+'</a> 退出聊天室 <div class="date">'+new Date().toLocaleTimeString()+
        '</div></div></div></div>';
      $('.main-panel .sys-msg').append(con);
      //--list
      console.log(data);
      var html='';
      $(data.users).each(function(k,v){
          html+=uslistTpl.replace('{{name}}',v.name).replace('{{tximg}}',v.profileImg);
      })
      $('.user-list .list').html(html);
      $('#online-nums').text(data.users.length);
      $('.sys-msg').scrollTop($('.sys-msg')[0].scrollHeight);
    })
    window.onunload=function(){
      socket.emit('logout',getCurName())
      socket.disconnect();
    }
    $('.send-msg .button').on('click',sendMsg);
    $('.send-msg input').on('keydown', function (e) {
        if(e.keyCode==13){
             sendMsg()
        }
    })
    $('.ui.modal .input input').on('keydown', function (e) {
        if(e.keyCode==13){
            setNewName()
        }
    })
    $('.ui.menu .right .label').on('click',showSetNameDialog);
    function updateUsersList(users){
        var html='';
        $(users).each(function(k,v){
            html+=uslistTpl.replace('{{name}}',v.name).replace('{{tximg}}',v.profileImg);
        })
        $('.user-list .list').html(html);
        $('#online-nums').text(data.users.length);
    }
    function getCurName(){
       return cookie.get('LGUS');
    }
    function sendMsg(){
        var val = $('.send-msg input').val();
        if (val) {
            var data={
              user:{
                name:getCurName(),
                profileImg:tximg
              },
              msg:val
            }
            socket.emit('msg', data)
            $('.send-msg input').val('');
        }
    }
    //改昵称
    function setNewName(){
      var name=$(this).find('.input input').val();
      if(!name) return;
      if(getCurName()){
          socket.emit('modify name',{lastName:getCurName(),curName:name});
      }else{
        socket.emit('set name',{name:name,profileImg:tximg});
      }
    }
    function showSetNameDialog(initial){
      $('.ui.modal')
      .modal({
          closable:false,
          blurring:true,
          inverted:true,
          onDeny:function(){
            if (!getCurName()) {
                socket.emit('not set name',tximg);
            }
          },
          onApprove:setNewName
      })
      .modal('show');
      var infoText=initial=='initial'?'点击取消，将使用系统分配的昵称':'点击取消，继续使用当前昵称';
      console.log(initial )
      $('.ui.modal .cancel')
      .popup({
          inline   : true,
          hoverable: true,
          position : 'bottom right',
          content:infoText
      })
    }
    $(function () {
        var usname=cookie.get('LGUS');
        console.log(usname);
        if(usname){
            var user={
              name:usname,
              profileImg:tximg
            }
            socket.emit('logined',user);
        }else{
          showSetNameDialog('initial');
        }
    })

})
