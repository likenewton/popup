import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import tpl from './refresh.tpl';
import './index.scss';

/* 添加refresh 组件步骤
 * 1、js文件(render函数中)执行 Components.Refresh.render
 * 2、html(相应元素)添加css-refresh类名
 */
export default class Refresh {

    constructor(paraObj) {
        this.data = {
            dom: '.js-Refresh',
            parent: '.js-routePage',
            isLock: false, //是否锁定整个操作
            isCanDo: false, //是否移动滑块
            startY: null, // 滑动的初始y轴坐标
            endY: null, // 当前滑动的y轴坐标
            maxY: 0, // 滑动的最远距离
            bounce: 150, // 弹出距离
            isScroll: true, // 默认页面可以滚动
            cb() { // 拉下刷新的回调函数，默认刷新页面
                location.href = location.href;
            },
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

        if ($(`${data.parent} ${data.dom}`).length == 0) {
            let oDiv = document.createElement('div');
            $(oDiv).addClass(data.dom.substr(1));
            $(data.parent).prepend($(oDiv));
            $(data.dom).html(template.compile(tpl));
        }

    }

    _initEvent() {
        let self = this;
        let $box = $(self.data.parent);

        $box.on('touchstart', (e) => {
            let $target = $(e.currentTarget);

            if ($(window).scrollTop() <= 0 && !self.data.isLock) {
                self.setData({
                    startY: e.touches[0].pageY,
                    isLock: true,
                    isCanDo: true,
                })
                // 将过渡关闭
                $target.css('transition', 'top 0s');
            } 
        })

        $box.on('touchmove', (e) => {
            let $target = $(e.currentTarget);

            if ($(window).scrollTop() <= 0 && self.data.isCanDo) {
                self.setData({endY: self.getEndY(e.touches[0].pageY)});
                if (self.data.startY < self.data.endY) {
                    e.preventDefault();
                    $target.css({
                        top: self.data.endY - self.data.startY,
                    });
                } 
            } 
        })

        $box.on('touchend', (e) => {
            let $target = $(e.currentTarget);
            $target.css({
                transition: 'top 0.2s',
                top: 0,
            });
            if ($(`${this.data.dom} .inner`).html() === '松开加载') {
                self.data.cb && self.data.cb();
            }
            self.setData({
                startY: null,
                endY: null,
                isLock: false,
                isCanDo: false,
            })
            $(`${this.data.dom} .inner`).html('下拉加载');
        })

    }


    // fn
    // 弹性效果
    getEndY(y) {
        let maxY = $('.js-Refresh .inner').height() + this.data.startY;

        if (y <= maxY) {
            return y;
        } else {
            if (y > maxY + this.data.bounce) {
                $(`${this.data.dom} .inner`).html('松开加载');
            } else {
                $(`${this.data.dom} .inner`).html('下拉加载');
            }
            return maxY + (y - maxY) / 10;
        }
    }

};


Refresh.render = function(paraObj) {
    return Refresh.obj = new Refresh(paraObj);
}