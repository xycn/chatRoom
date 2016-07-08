/**
 * Created by tach on 2016/4/14.
 */
 'use strict';
import React from 'react';
class Header extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    var userDIV=this.props.clientUser?
    <div className="item"><i className="user icon"></i><div className="text">{this.props.clientUser.name}</div></div>:'';
    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
            <a className="item header active"><h3>chatRoom</h3></a>
            <div className="right menu">
                {userDIV}
                <div className="item"><a className="ui label">设置</a></div>
            </div>
        </div>
      </div>
    )
  }
}
//TODO:
//在app.express.js文件中配置了webpack-devserver，
//执行gulp dev不报错，顺利通过
//但是修改react相关js文件，页面没有热更新
//怀疑是不是跟项目本身用了socket相关
export { Header as default};
