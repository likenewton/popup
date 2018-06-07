import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import tpl from './loading.tpl';
import './index.scss';


export default class Loading {

    constructor(paraObj) {
        this.data = {
            dom: '.js-Loading',
                  
        }
        this.setData(paraObj);
        this._render(this.data);
    }

    setData(data, info) {
        let oldData = this[info || 'data'];
        let newData = $.extend(oldData, data);
        this[info || 'data'] = newData;
    }

    _render(data) {

        if ($(data.dom).length == 0) {
            let oDiv = document.createElement('div');
            $(oDiv).addClass(data.dom.substr(1));
            document.body.appendChild(oDiv);
            $(data.dom).css({
                'backgroundImage': `url('${require('../../static/img/com/loading.gif')}')`,
            })

        } 
        
    }

    show() {
        $(this.data.dom).show();
    }

    hide() {
        $(this.data.dom).hide();
    }
  
};


Loading.render = function(paraObj) {
    return Loading.obj = new Loading(paraObj);
}