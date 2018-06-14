import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import tpl from './swiper.tpl';
import './index.scss';

/* 添加refresh 组件步骤
 * 1、js文件(render函数中)执行 Components.Refresh.render
 * 2、html(相应元素)添加css-refresh类名
 */
export default class Swiper_1 {

    constructor(paraObj) {
        this.data = {
            dom: '.js-Swiper',
            // self-config
            isShowBtn: false, // 默认不显示左右按钮
            isShowPagination: false,
            // swiper-config
            effect: 'slide', // slide,fade,cube,flip
            slidesPerView: 1,
            centeredSlides: true,
            coverflowEffect: {
                rotate: 10,
                stretch: 20,
                depth: 400,
                modifier: 1,
                slideShadows: false,
                resistanceRatio: 0,
            },
            cubeEffect: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 100,
                shadowScale: 0.6
            },
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
            },
            direction: 'horizontal', // vertical
            speed: 500, // 切换速度，即slider自动滑动开始到结束的时间（单位ms），也是触摸滑动时释放至贴合的时间
            grabCursor: true, // 设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同）
        }
        this.setData(paraObj);
        this._render(this.data);
        this._initEvent();
    }

    setData(data, info) {
        let oldData = this[info || 'data'];
        let newData = $.extend(oldData, data);
        this[info || 'data'] = newData;
    }

    _render(data) {

        let $box = template.compile(tpl)({
            data
        });

        $(data.dom).html($box);

        var mySwiper = new Swiper(`${data.dom} .swiper-container`, this.data)

    }

    _initEvent() {
        let self = this;
        let $box = $(self.data.parent);


    }


};


Swiper_1.render = function(paraObj) {
    return Swiper_1.obj = new Swiper_1(paraObj);
}