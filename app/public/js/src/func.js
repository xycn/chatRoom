//TODO:
//将regSocket导出并在entry的constructor函数中执行绑定socket事件
//即可通过Action控制component的render
//未设置名字的用户，进入页面logined事件的时候，服务端就会给该用户分配一个名字。
//弹框后提醒是否更改名字，如果更改则触发 modify-name事件，否则不做操作。进入以后更改名字的时候也是一样，统一的

import Action from './../reflux/action';
import Cookie from './../lib/opcookie';

export function regSocket(cb) {

  $(function () {
      var cuser=JSON.parse(Cookie.get('DM_'));
      console.log(cuser);
      if(cuser){
          socket.emit('logined',{type:'hasUser',user:cuser});
      }else{
        showSetNameDialog('initial');
      }
  })
    socket.on('logined', function (data) {
       console.log('enter socket event logined--------------');
        window.global_user=JSON.parse(Cookie.get('DM_'));
        Action.login(data);
        setTimeout(function(){
           $('.sys-msg').scrollTop($('.sys-msg')[0].scrollHeight);
        },200)
    })
    socket.on('msg', function (data) {
        Action.recieveMessage(data);
        setTimeout(function(){
           $('.chat-msg').scrollTop($('.chat-msg')[0].scrollHeight);
        },200)
    })
    socket.on('modify-user',function(data){
        Action.modifyUser(data);
        setTimeout(function(){
           $('.sys-msg').scrollTop($('.sys-msg')[0].scrollHeight);
        },200)
    })
    socket.on('set-cookie',function(data){
        console.log('SETCOOKIE',data)
        if(typeof data === 'undefined') {
          console.log('cookie value undefined');
          return;
        }
        Cookie.set('DM_UID',data.uid);
        Cookie.set('DM_NAME',data.name);
        Cookie.set('DM_PROFILE',data.profile);
        Cookie.set('DM_',JSON.stringify(data));
        window.global_user=data;
    })
    socket.on('logout',function(data){
        Action.logout(data);
    })
    window.onbeforeunload=function(){
      socket.emit('logout',{uid:Cookie.get('DM_UID')});
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
            $('.ui.modal').trigger('click');
        }
    })
    $('.ui.menu .right .label').on('click',showSetNameDialog);
}
function getCurName(){
   return Cookie.get('DM_NAME');
}
function setNewName(){
  var inputName=$('.ui.modal').find('.input input').val();
  if(!inputName) return;
  if(getCurName()){
      socket.emit('modify-user',{name:inputName,uid:Cookie.get('DM_UID')});
  }else{
      socket.emit('logined',{type:'hasName',name:inputName});
  }
}
function showSetNameDialog(initial){
  $('.ui.modal')
  .modal({
      closable:false,
      blurring:true,
      inverted:true,
      onDeny:function(){
        if(!getCurName()){
            socket.emit('logined',{type:'noName'});
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

function sendMsg(){
    var val = $('.send-msg input').val();
    if (val) {
        socket.emit('msg', {uid:Cookie.get('DM_UID'),msg:val})
        $('.send-msg input').val('');
    }
}
