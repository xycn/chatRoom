
import React,{Component} from 'react';
import ChatSection from './chatSection/chatSection';
import UserListPanel from './userList/userList';

class MainPanel extends Component{
    constructor(props){
      super(props);
      this.state={};
    }
    render(){
        return(
          <section className="main-panel ui container grid">
            <ChatSection />
            <UserListPanel />
          </section>
        )
    }
}

export { MainPanel as default }
