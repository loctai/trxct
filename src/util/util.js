export default {
    notice(msg, color = '007eff', time = 3000) {
        return new Promise((resolve, reject) => {
            let wrap = jQuery('<div style="position:fixed; left:calc(50% - 150px); box-shadow:0 5px 25px rgba(0,0,0,0.2); width:320px; top:40px; background:#' + (color ? color : '007eff') + '; border-radius:10px; color:#fff; padding:20px 20px; font:14px/1.2 Tahoma, sans-serif; cursor:pointer; z-index:999999; text-align:center;">' + msg + '</div>')
                .on('click', () => { wrap.remove(); resolve(); })
                .appendTo('body');
            if(time) setTimeout(() => { wrap.remove(); }, time);
        });
    },
    checkEnv() {
        window.onload = function () {
            if (!window.tronWeb) {
                console.log(!window.tronWeb)
                this.notice('请先安装波场钱包插件', '007eff', 5000)
                
            } else {
                if (!window.tronWeb.ready) {
                    this.notice('波场钱包请先登录', '007eff', 10000)
                }
            }
        }
    },
    strToHex(str) {
        if (str === "")
            return "";
        var hexCharCode = [];
        hexCharCode.push("0x");
        for (var i = 0; i < str.length; i++) {
            hexCharCode.push((str.charCodeAt(i)).toString(16));
        }
        return hexCharCode.join("");
    },
    async signMessage(message) {
        const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';
        let hexStr = this.strToHex(message);
        let sign = await window.tronWeb.trx.signMessage(hexStr, privateKey);
        return sign;
    },
    setCookie(name, value, days = 30) {
        let d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    getCookie(name) {
        let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    delCookie(name)
    {
        this.setCookie(name, '', -1);
    },
    formatDateTime(dateTime, fmt) {
        let o = {
            "M+": dateTime.getMonth() + 1, //月份
            "d+": dateTime.getDate(), //日
            "h+": dateTime.getHours(), //小时
            "m+": dateTime.getMinutes(), //分
            "s+": dateTime.getSeconds(), //秒
            "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度
            "S": dateTime.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    uniqueid() {
        let idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
        do {
            let ascicode = Math.floor((Math.random() * 42) + 48);
            if (ascicode < 58 || ascicode > 64) {
                idstr += String.fromCharCode(ascicode);
            }
        } while (idstr.length < 32);
        return (idstr);
    }

}
