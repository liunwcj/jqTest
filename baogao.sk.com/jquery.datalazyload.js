    /*
    *   懒加载(滚动条滚动加载)
    *   css:
    *       textarea{ visibility:hidden; }
    *       .bg-loading{ background:url(../images/mloading.gif) no-repeat center; height:(根据内容而定)}
    *
    *   html:
    *       <textarea>...内容...</textarea>
    * */

;(function($,window){
    var $window = $(window);
        $.fn.datalazyload = function () { //懒加载(滚动条滚动加载)
            var $this = $(this);
            function update(){
                var topH = $window.height() + $window.scrollTop();
                $this.each(function () {
                    var $textarea = $(this).find('textarea').eq(0);
                    $textarea.css('visibility', 'hidden');
                    if ($textarea.css('display') != 'none' && topH >= $(this).offset().top) {
                        $textarea.before($textarea.val()).hide();
                    };
                });
            };
            update();
            $window.bind('scroll resize',function(){
                update();
            });
        };
})(jQuery,window);