
import React from 'react';
class SendMsgPanel extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return(
      <div className="send-msg row ui form">
        <div className="input-wrap ui fields">
                  <div className="ui left icon input big field thirteen wide">
                      <input placeholder="输入聊天内容.."/>
                      <i className="icon edit"></i>
                  </div>
                  <button className="ui animated fade button primary big field three wide">
                      <div className="visible content">发送</div>
                      <div className="hidden content">OK</div>
                  </button>
        </div>
    </div>
    )
  }
};

export { SendMsgPanel as default};
