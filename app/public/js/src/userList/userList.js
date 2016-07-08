
import React from 'react';

class UserItem extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="item">
          <img className="ui avatar image" src={this.props.profile}/>
          <div className="content"> <a className="header">{this.props.name}</a></div>
      </div>
    )
  }
}

class UserListPanel extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    var list='',timestamp=new Date().getTime(),propUsers=this.props.users;
    if(propUsers){
      list=propUsers.map(function(item,key){
          return <UserItem key={timestamp+key} name={item.name} profile={item.profile} />
      })
      return (
          <aside className="user-list column three wide">
              <h4>当前在线<span id="online-nums">{propUsers.length}</span>人</h4>
              <div className="ui divider"></div>
              <div className="ui middle aligned divided animated  list">
                    {list}
              </div>
          </aside>
      )
    }else{
      return (
          <aside className="user-list column three wide">
              <h4>当前在线<span id="online-nums"></span></h4>
              <div className="ui divider"></div>
              <div className="ui middle aligned divided animated  list">
              </div>
          </aside>
      )
    }

  }
}

export { UserListPanel as default};
