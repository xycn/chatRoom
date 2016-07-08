
import React from 'react';

class MsgItem extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var props=this.props;
    return (
          <div className="comment">
              <a href="" className="avatar"> <img src={this.props.profile} alt="photo" /></a>
              <div className="content">
                  <a href="" className="author">{props.name}</a>
                  <div className="metadata">{props.time}</div>
                  <div className="text">{props.content}</div>
              </div>
              <div className="divider ui"></div>
          </div>
    )
  }
}

class MsgPanel extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var list='',timestamp=new Date().getTime(),propMsg=this.props.msg;
    if(propMsg){
      list=propMsg.map(function(item,key){
          return <MsgItem key={timestamp+key} name={item.user.name} profile={item.user.profile} content={item.msg.content} time={item.msg.time} />
      })
      return (
        <div className="chat-msg row ui feed">
          <div className="ui comments">
            {list}
          </div>
        </div>
      )
    }else{
      return (
        <div className="chat-msg row ui feed">
          <div className="ui comments">
          </div>
        </div>
      )
    }
  }
}

export { MsgPanel as default};
