;
(function ($, window) {
    var $window = $(window);
    $.fn.Xslider = function (options) {  //选项卡、焦点图、事件触发加载图片
        var settings = $.extend({
            effect: 'none', //效果  有scrollx|scrolly|fade|none
            speed: 300, //动画速度
            space: 5000, //时间间隔
            auto: false, //自动滚动
            trigger: 'mouseover', //触发事件 注意用mouseover代替hover
            content_box: '.contents', //内容容器id或class
            content_tag: 'li', //内容标签 默认为<li>
            switcher_box: '.switchers', //切换触发器id或class
            switcher_tag: 'li', //切换器标签 默认为<li>
            active_class: 'active', //当前切换器样式名称 不含"."
            prev: '.prev', //上一个幅箭头样式名称
            next: '.next', //下一个幅箭头样式名称
            /*
             *TODO  不倒序滚动
             *recycle:true,
             */
            rand: false, //是否随机指定默认幻灯页
            index: '', //是否显示索引 1、容器id或class(1/5) || 2、list( 1,2,3,4,5 )添加到 switcher_box: '.switchers' 容器；切换器标签 switcher_tag: 'li'
            load_type: false,//加载图片 有img|textarea|false
            callback_fn: null //回调函数 返回内容索引
        }, options);

        var index = 1;
        var last_index = 0;
        var $content_box = $(this).find(settings.content_box), $contents = $content_box.find(settings.content_tag);
        var $switcher = $(this).find(settings.switcher_box);
        if ($content_box.length < 1) {
            return false;
        }
        var content_pos = $content_box.position();
        var content_left = content_pos.left;
        var content_top = content_pos.top;

        if (settings.rand) {
            index = Math.floor(Math.random() * $contents.length);
            slide();
        }
        if (settings.effect == 'fade') {
            $.each($contents, function (k, v) {
                (k == 0) ? $(this).css({'position': 'absolute', 'z-index': 9}) : $(this).css({'position': 'absolute', 'z-index': 1});
            });
        }

        //添加索引值(1,2,3,4,5)
        if (settings.index === 'list') {
            var temp = '';
            for (var i = 1; i <= $contents.length; i++) {
                i === 1 ? temp += '<' + settings.switcher_tag + ' class="' + settings.active_class + '" ><a href="javascript:;">' + i + '</a></' + settings.switcher_tag + '>' : temp += '<' + settings.switcher_tag + '><a href="javascript:;">' + i + '</a></' + settings.switcher_tag + '>';
            }
            $switcher.html(temp);
        }
        ;

        var $switcher_tag = $switcher.find(settings.switcher_tag);

        function slide() {
            imgData();
            if (index >= $contents.length) index = 0;
            $switcher_tag.removeClass(settings.active_class).eq(index).addClass(settings.active_class);
            switch (settings.effect) {
                case 'scrollx':
                    $content_box.width($contents.length * $contents.outerWidth());
                    var l = content_left - $contents.width() * index;
                    $content_box.stop().animate({left: l}, settings.speed);
                    break;
                case 'scrolly':
//                    $contents.css({display: 'block'});
                    var t = content_top - $contents.height() * index;
                    $content_box.stop().animate({top: t}, settings.speed);
                    break;
                case 'fade':
                    $contents.eq(last_index).stop(true, true).fadeOut(settings.speed).end().eq(index).stop(true, true).fadeIn(settings.speed);
                    break;
                case 'none':
                    $contents.hide().eq(index).show();
                    break;
            }
            ;

//            回调函数 返回内容索引
            if (typeof settings.callback_fn === 'function') {
                settings.callback_fn(index);
            }
            last_index = index;
            index++;
            indexSum();
        };

//        根据id/class添加索引值(1/5)
        var indexSum = function () {
            if ($(settings.index).length > 0) {
                $(settings.index).html(('<em class="index">' + index + '</em>/<em class="count">' + $contents.length + '</em>'));
            }
            ;
        };
        indexSum();

//        事件触发加载图片
        function imgData() {
            if (settings.load_type) {
                var $tempDate = $contents.eq(index).find(settings.load_type);
                switch (settings.load_type) {
                    case 'img':
                        $tempDate.each(function () {
                            var self = this,$self = $(this);
                            self.loaded = false;
                            if(!self.loaded){
                                $("<img />").bind('load',function(){
                                    $self.hide().attr('src',$self.data('src')).show();
                                    self.loaded = true;
                                }).attr('src',$self.data('src'));
                            }
                        });
                        break;
                    case 'textarea':
                        $tempDate.css('visibility', 'hidden');
                        if ($tempDate.css('display') != 'none') {
                            $tempDate.before($tempDate.val()).hide();
                        };
                        break;
                }
                ;
            }
            ;
        };

        if (settings.auto) var Timer = setInterval(slide, settings.space);
        $switcher_tag.bind(settings.trigger, function () {
            _pause();
            index = $(this).index();
            slide();
            _continue()
        });

        $(this).find(settings.prev).click(function () {
            _pause();
            if (!last_index) return;
            index = --last_index;
            slide();
            _continue();
        });

        $(this).find(settings.next).click(function () {
            _pause();
            slide();
            _continue();
        });

        $content_box.hover(_pause, _continue);
        function _pause() {
            clearInterval(Timer);
        }

        function _continue() {
            if (settings.auto) Timer = setInterval(slide, settings.space);
        }

        return this;
    },
        $.fn.datalazyload = function () { //懒加载(滚动条滚动加载)
            var $this = $(this);

            function update() {
                var topH = $window.height() + $window.scrollTop();
                $this.each(function () {
                    var $textarea = $(this).find('textarea').eq(0);
                    $textarea.css('visibility', 'hidden');
                    if ($textarea.css('display') != 'none' && topH >= $(this).offset().top) {
                        $textarea.before($textarea.val()).hide();
                    }
                    ;
                });
            };
            update();
            $window.bind('scroll resize', function () {
                update();
            });
        },
        $.fn.avatarError = function () {  // 默认图片处理
            $(this).each(function () {
                this.onerror = function () {
                    this.onerror = null;
                    this.src = 'http://www.shikee.com/images/newItem/avatar/face_' + $(this).data('type') + '.jpg';//替代头像
                    this.setAttribute('alt', '默认头像');
                }
                this.src = this.src;
            });
        }

    /*
     * JS    :   $('img.J_avatar').avatarError();
     * HTML  :   <img class="J_avatar" data-type='temp' src="..." /> temp:big | middle | small / 大/中/小
     * Ajax  :  onerror="this.onerror=null;this.src='http://www.shikee.com/images/newItem/avatar/face_small.jpg'";
     * */
})(jQuery, window);
