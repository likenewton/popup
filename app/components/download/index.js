import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import tpl from './download.tpl';
import './index.scss';


export default class Download {

    constructor(paraObj) {
        this.data = {
            componentName: 'Download',
            dom: '.js-Download',
            ioscb: null, // 是ios回调 (必传)
            andcb: null, // 是android回调 (必传)
            Api: null, // (必传)
        };

        this.setData(paraObj);

        this._render(this.data);
        this.addEvents();

    }

    setData(data, info) {
        let oldData = this[info || 'data'];
        let newData = $.extend(oldData, data);
        this[info || 'data'] = newData;
    }


    _render(data) {
        let _this = this;


    }


    addEvents() {
        let _this = this;
        let $doc = $(document);

        $doc.on('click', `${_this.data.dom}`, () => {
            let version = _this.data.Api.Share.browser().versions;

            if (version.ios || version.iPhone || version.iPad) {
                // 是 ios 端
                _this.data.ioscb && _this.data.ioscb();
            } else {
                // 是 android 端
                if (version.weixin) {
                    // 如果是微信就提示用浏览器打开
                    _this.$box = $(template.compile(tpl)({
                        data: _this.data,
                    }));
                    if (_this.$box) {
                        _this.$box.remove();
                    }
                    $('body').append(_this.$box);
                } else {
                    _this.data.andcb && _this.data.andcb();
                }  
            }

        });

        // $doc.on('click', '.download-popup', (e) => {
        //     $(e.currentTarget).remove();
        // })

    }


};

Download.render = function(paraObj) {
    if (Download.obj) {
        Download.obj.setData(paraObj);
        Download.obj._render(Download.obj.data);
    } else {
        return Download.obj = new Download(paraObj);
    }
}