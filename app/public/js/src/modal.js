'use strict';
import React from 'react';

class Modal extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  componentDidMount(){
    
  }
  render(){
    return(
      <div className="ui basic small modal">
          <div className="header">
              <div className="ui icon inverted">
              <i className="icon info"></i>
              设置昵称
              </div>
          </div>
          <div className="content">
              <p>请输入您要使用的聊天昵称：</p>
              <div className="ui left icon input fluid">
              <input type="text"/>
              <i className="icon edit"></i>
              </div>
          </div>
          <div className="actions">
              <div className="ui approve positive button">确定</div>
              <div className="ui cancel negative button">取消</div>
          </div>
      </div>
    )
  }
}
export { Modal as default};
