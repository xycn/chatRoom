/**
 * Created by tach.
 */
define([],function(){

    var helper={
        parseParam:function(name){
            var queryReg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var queryStr = location.search.substr(1).match(queryReg);
            if(queryStr !== null){
                return queryStr[2];
            }
            return null;
        },
        random:function(n,m){
            m=Number(m);n=Number(n);
            if(isNaN(m)||isNaN(n)) return 0;
            var ranNum= Math.random()*(m-n)+n;
            return Math.round(ranNum);
        },
        getUA:function(){
            var UA_WECHAT = 'micromessenger';
            var UA_WEIBO = 'weibo';
            var UA_NA = 'na';
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf(UA_WECHAT) != -1) {
                return 'weixin';
            } else if (ua.indexOf(UA_WEIBO) != -1) {
                return 'weibo';
            } else {
                return UA_NA;
            }
        },
        baiduTJ:{
            _ua: null,
            actName:'',
            push: function (type,action,value,oprations) {
                if (this._ua == null) {
                    this._ua = this._uaGet();
                }
                var ua = this._ua,
                    actName=this.actName===''?'':this.actName+'_',
                    opration=oprations==''?'':actName+oprations;
                if (typeof _hmt != 'undefined') {
                    _hmt.push(['_trackEvent',actName+type+'_'+action+'_'+value+'_'+ua,opration,this.actName,'none']);
                }
            },
            _uaGet: function () {
                var UA_WECHAT = 'micromessenger';
                var UA_WEIBO = 'weibo';
                var UA_NA = 'na';
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf(UA_WECHAT) != -1) {
                    return 'weixin';
                } else if (ua.indexOf(UA_WEIBO) != -1) {
                    return 'weibo';
                } else {
                    return UA_NA;
                }
            }
        },
        msgArr:[],
        setAlertText:function(ok,cancel){
            this.okStr=ok;
            this.cancelStr=cancel;
            return this;
        },
        clearAlertText:function(){
            this.okStr=this.cancelStr=undefined;
        },
        //msg:弹出的消息,
        //minute:自动消失的秒数或者弹窗确认后的回调函数
        alert:function(msg,minute,isConfirm){
            var showMe=function(){
                var msg=this.msgArr[0];
                alertHtml.find('#message-text').html(this.msgArr[0].msg);
                msg.okStr&&alertHtml.find('.ok').html(this.okStr);
                msg.cancelStr&&alertHtml.find('.cancel').html(this.cancelStr);
                this.clearAlertText();
                alertHtml.appendTo($('body'));
                msg.isConfirm&&$('#message-button').addClass('confirm');
                if(typeof msg.minute=='number'){
                    $('#message-button').addClass('autohide').animate({opacity:1},msg.minute,hideMe);
                }
                $('#message-box').addClass('active').siblings('div,section').css({'-webkit-filter':'blur(3px)','filter':'blur(3px)'});
                $('#message-button .ok').off().on('click',function(){
                    typeof msg.minute === 'function'&&msg.minute.call(null);
                    hideMe();
                })
                $('#message-button .cancel').off().on('click',hideMe);
                $(document).on('touchmove',function(e){
                    e.preventDefault();
                    return false;
                })
            }.bind(this);
            var hideMe=function(){
                $('#message-box').siblings('div,section').css({'-webkit-filter':'none','filter':'none'});
                $('#message-box').remove();
                this.msgArr.shift();
                this.msgArr.length>0&&showMe();
                $(document).off('touchmove');
            }.bind(this);
            this.msgArr.push({msg:msg,minute:minute,isConfirm:isConfirm,okStr:this.okStr,cancelStr:this.cancelStr});
            var  alertHtml=$('<div id="message-box"><div class="message-wrap"><div id="message-text"></div><div id="message-button"><div class="ok">确定</div><div class="cancel">取消</div></div></div></div>');
            $('#message-box').length==0&&showMe();
        },
        //msg:弹出的消息
        //callback:弹窗确认后的回调函数
        confirm:function(msg,callback){
            this.alert(msg,callback,true);
        },
        delay:function(minutes,fn){
            minutes=isNaN(minutes)?0:minutes;
            var _this=this;
            setTimeout(function(){
                fn.call(_this);
                return _this;
            },minutes)
        },
        setTimeOut:function(fn,leftMinutes){
            var lefts=leftMinutes;
            function timeOuter(){
                if(--lefts==-1) return;
                fn.call(helper,lefts);
                setTimeout(arguments.callee,1000);
            }
            timeOuter();
        },
        extend:function(obj){
            for(var o in obj){
                if(obj.hasOwnProperty(o)){
                    this[o]=obj[o];
                }
            }
        }
    }
    return helper;
})