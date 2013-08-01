;(function($,window){
    var $window = $(window);
    $.fn.datalazyload = function(){
        var $this = $(this);
        $window.scroll(function(){
            var topH = $window.height()+$window.scrollTop();
            $this.each(function(){
                var $textarea = $(this).find('textarea');
                if($textarea.css('display') != 'none' && topH >= $(this).offset().top){
                    $textarea.before($textarea.val()).hide();
                }
            });
        });
        $window.trigger('scroll');
    };
})(jQuery,window);