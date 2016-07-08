
import Reflux from 'Reflux';

let Action = Reflux.createActions([
        "login",     // 登录后通知前端更新
        "sysInfo", // 系统消息更新
        "recieveMessage",   // 聊天消息更新
        "sendMessage",     // 发送消息
        "userUpdate", // 用户更新
        "modifyUser",
        "logout"
]);

export  { Action as default};
