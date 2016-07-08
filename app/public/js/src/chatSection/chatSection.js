
import React,{Component} from 'react';
import MsgPanel from './msgPanel';
import SendMsgPanel from './sendMsgPanel';
import SysPanel from './sysPanel';

class ChatSection extends Component{
    constructor(props){
      super(props);
    }
    render(){
      console.log(this.props);
        return(
          <section className="chat-sec column thirteen wide">
            <SysPanel  sysMsg={this.props.sysMsg}/>
            <MsgPanel msg={this.props.msg} />
            <SendMsgPanel />
          </section>
        )
    }
}

export {ChatSection as default }
