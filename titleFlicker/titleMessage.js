/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-12
 * Time: 下午2:49
 * To change this template use File | Settings | File Templates.
 */
var titleMessage = {

    time:1000,//闪烁时间
    txtDefault:'【新消息】',//默认 自定义文字
    txtAlt:'【　　　】',//替换 自定义文字

    title:document.title,//标题名称
    timer:null,//定时器开关
    show:function(){
        this.timer = setInterval(function(){
            var tit = document.getElementsByTagName('title')[0];
            if(document.title.substring(0,titleMessage.txtDefault.length) == titleMessage.txtDefault){
                document.title = titleMessage.txtAlt + titleMessage.title;
            }else{
                document.title = titleMessage.txtDefault + titleMessage.title;
            }
        },this.time);
    },
    clear:function(){
        clearInterval(this.timer);
        document.title = this.title;
    }
};