
import Reflux from 'Reflux';
import Action from './action';
//TODO:trigger函数并不能触发component的render，需要查找原因。可能是mixins没连接上。
//->原因是es6写的不支持mixin，而之前是用mixin连接的，现在改成了store.listen方法监听
//各组件数据耦合性太高，某个组件的render更新每次都要通过总组件传递数据，各组件数据会互相影响


let Store =Reflux.createStore({
      //这里自定义onXXX表示socket接收处理函数，onToXXX表示socket发送处理函数
      listenables: [Action],
      init:function(){
          this.msgArr=[];this.sysMsgArr=[];
          this.appData={};
      },
      update:function(){
            this.trigger(this.appData);
      },
      updateMsg:function(message,type){
        this.msg.push(message);
        this.trigger({msg:this.msg,type:type});
      },
      updateSysMsg:function(sysMsg){
          this.sysMsgArr.push(sysMsg);
          this.appData.sysMsg=this.sysMsgArr;
      },
      onLogin: function(data) {
        console.log(window.global_user);
        console.log('socket data',data);
        this.appData=data;
        var sysMsg={
          type:data.type,
          user:data.activeUser,
          time:data.time
        }
        this.appData.clientUser=window.global_user;
        this.sysMsgArr.push(sysMsg);
        this.appData.sysMsg=this.sysMsgArr;
        this.appData.msg=this.msgArr;
        this.update();
      },
      onModifyUser(data){
          var sysMsg=data.sysMsg;
          sysMsg.type=data.type;
          sysMsg.time=data.time;
          sysMsg.user=data.activeUser;
          this.sysMsgArr.push(sysMsg);
          this.appData.sysMsg=this.sysMsgArr;
          this.appData.clientUser=window.global_user;
          this.appData.users=data.users;
          this.update();
      },
      onLogout:function(data){
        var sysMsg={};
        sysMsg.type=data.type;
        sysMsg.time=data.time;
        sysMsg.user=data.activeUser;
        this.sysMsgArr.push(sysMsg);
        this.appData.sysMsg=this.sysMsgArr;
        this.appData.users=data.users;
        this.update();
      },
      onSysInfo:function(){

      },
      onRecieveMessage:function(data){
        var message={
          user:data.activeUser,
          msg:{
            content:data.msg,
            time:data.time
          }
        };
        // this.updateMsg(message);
        this.msgArr.push(message);
        this.appData.msg=this.msgArr;
        this.update();
      },
      sendMessage:function(){

      },
      userUpdate:function(){

      }
})

export default Store;
//TODO:
// socket事件注册的实现， 并且写在哪里？
// index.js中的socket事件处理函数逻辑的合并 用在当前项目中
// action方法是在componet中调用的，action又会调用store方法更新数据，store跟新了数据再触发component的重新render
// 后端给返回的msg中不包含user信息，为的是使后端传输数据格式标准化。而且前端msg消息是用户产生，每条msg都对应一个用户，而且需要累加的，所以前端msg字段必须加上用户相关信息。然后统一render
