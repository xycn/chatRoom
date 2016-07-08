 'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import ReactAddons from 'react-addons';
import Reflux from 'reflux';
import Action from './reflux/action';
import Store from './reflux/store';

import Modal from './src/modal';
import Header from './src/header';
import ChatSection from './src/chatSection/chatSection';
import UserListPanel from './src/userList/userList';

import {regSocket} from './src/func';

class App extends Component{
   constructor(props){
     super(props);
     this.state={};
    //  this.mixins=[Reflux.connect(Store,"list")];
     this.handleSocket=this.handleSocket.bind(this);
     this.stateChange=this.stateChange.bind(this);
    //  regSocket();
   }
   componentDidMount() {
      //  Action.login();
      regSocket();
      Store.listen(this.stateChange)
      console.log('didMount')
   }
   componentWillMount(){
     console.log('state:',this.state)
   }
   stateChange(data){
     console.log('stateChange:',data);
     this.setState(data)
   }
   handleSocket(e){
      // Action.login();
      // console.log(e,this);
      // this.setState({curName:'xiaohua'})
   }
   render(){
     console.log('render',this.state)
      return (
        <div className="app"  >
           <Header clientUser={this.state.clientUser}/>
           <Modal/>
           <section className="main-panel ui container grid">
             <ChatSection msg={this.state.msg} sysMsg={ this.state.sysMsg }/>
             <UserListPanel users={this.state.users}/>
           </section>
        </div>
      )
   }
}

//TODO:
ReactDOM.render( <App />,document.getElementById('room'))
