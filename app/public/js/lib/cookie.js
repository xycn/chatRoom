/**
 * Created by tach on 2016/4/12.
 */
define([],function(){
    var Cookie = {
        /**
         * ���name��ֵ
         * @param name {string} cookie ����
         */
        get: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) {
                    var ret;
                    try {
                        ret = decodeURIComponent(c.substring(nameEQ.length, c.length));
                    } catch (e) {
                        ret = unescape(c.substring(nameEQ.length, c.length));
                    }
                    return ret;
                }
            }
            return null;
        },

        /**
         * ����cookie
         * @param name {string} cookie ����
         * @param vale {string} cookie ֵ
         * @param day {number}   ��Чʱ��������
         * @param path {string}  cookie path
         * @param domain {string}
         * @param secure {string}
         */
        set: function(name, value, days, path, domain, secure) {
            var expires;
            if (typeof days == "number") {
                var date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = date.toGMTString();
            } else if (typeof days == "string") {
                expires = days;
            } else {
                expires = false;
            }
            document.cookie = name + "=" + encodeURIComponent(value) + (expires ? ";expires=" + expires : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
        },

        /**
         * ɾ�� name
         * @param name {string} cookie ����
         * @param path {string}
         * @param domain {string}
         * @param secure {string}
         */
        del: function(name, path, domain, secure) {
            this.set(name, "", -1, path, domain, secure);
        }
    };
    return Cookie;
});