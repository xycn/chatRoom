
import React from 'react';

class LoginInfoItem extends React.Component{
  constructor(props){
    super(props);
    this.toWelcome=this.toWelcome.bind(this);
  }
  toWelcome(e){
      var uname=e.target.getAttribute('data-uname');
      socket.emit('msg', {uid:window.global_user.uid,msg:'hi~'+uname+',欢迎进入❤❤❤'});
  }
  componentDidMount(){

  }
  render(){
    console.log('sys render',this.props.user.uid,window.global_user.uid);
    var comWelcome= this.props.user.uid==window.global_user.uid? '':
        (<div className="meta">
        <a href="javascript:void(0)" onClick={this.toWelcome}  ref="welcome" data-uname={this.props.user.name} className="like">
            <i className="like icon"  ></i> 问候一下
            </a>
        </div>);
    return(
      <div className="event ui">
          <div className="content">
              <div className="summary">
                  <a href="javascript:void(0)">{this.props.user.name}</a> 加入聊天室
                  <div className="date">{this.props.time}</div>
              </div>
              <div className="extra text">哗哗！飞入帅哥一枚，快来围观..</div>
              {comWelcome}
          </div>
       </div>
   )
  }
}
class ModifyNameInfoItem extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="event ui">
          <div className="content">
              <div className="summary">
                  <a href="">{this.props.originUser}</a> 将昵称修改为：
                <a href="">{this.props.destUser}</a>
              </div>
          </div>
       </div>
   )
  }
}
class LogoutInfoItem extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="event ui">
          <div className="content">
              <div className="summary">
                  <a href="">{this.props.user}</a> 退出了聊天室
                  <div className="date">{this.props.time}</div>
              </div>
          </div>
       </div>
   )
  }
}

class SysPanel extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    var list='',timestamp=new Date().getTime(),propSysMsg=this.props.sysMsg;
    console.log(this.props);
    if(propSysMsg){
      list=propSysMsg.map(function(item,key){
          if(item.type=='logined'){
               return <LoginInfoItem key={timestamp+key} user={item.user} time={item.time}/>
          }else if(item.type=='modify-user'){
              return <ModifyNameInfoItem key={timestamp+key} originUser={item.originUser.name} destUser={item.destUser.name}/>
          }else if(item.type=='logout'){
              return <LogoutInfoItem key={timestamp+key} user={item.user.name} time={item.time}/>
          }
       })
       return (
         <div className="sys-msg row ui feed divided">
             {list}
        </div>
       )
   }else{
     return <div className="sys-msg row ui feed divided"></div>
   }
  }
}

export { SysPanel as default};
