/**
 * Created with JetBrains WebStorm.
 * User: liunwcj
 * Date: 13-4-19
 * Time: 上午9:02
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.sel = function(options){
        var settings = {
            click_btn:'.btn',
            content_box:'.box',
            content_tag:'li',
            content_tag_cur:'current'
        },_this = $(this),selectID;
        $.extend(settings,options);
        _this.find(settings.click_btn).click(function(){
            _this.find(settings.content_box).toggle();
            _this.find(settings.content_box+' '+settings.content_tag).eq(selectID).addClass(settings.content_tag_cur);
            return !1;
        });
        $(document).click(function(){
            oHide();
            return !1;
        });
        $(settings.content_box+' '+settings.content_tag).click(function(){
            selectID = $(this).index();
//            $(this).addClass('current');
            _this.find(settings.click_btn).val($(this).text());
            oHide();
            return !1;
        });
        $(settings.content_box).hover(function(){
            $(this).find(settings.content_tag).removeClass(settings.content_tag_cur);
        });
        function oHide(){
            _this.find(settings.content_box).hide();
        }
    }
})(jQuery);