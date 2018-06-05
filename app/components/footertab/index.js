import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import FastClick from 'fastclick';
import tpl from './footertab.tpl';
import './index.scss';

export default class Footertab {

    constructor(paraObj) {

        this.data = {
            componentName: 'Footertab',
            dom: '.js-Footertab',
            list: [],
        }

        this.setData(paraObj);
        this._render();
        this._addEvents();

    }

    setData(data, info) {
        let oldData = this[info || 'data'];
        let newData = $.extend(oldData, data);
        this[info || 'data'] = newData;
    }

    _render() {
        let data = this.data;

        this.$box = $(template.compile(tpl)({
            data
        }));
        if (this.$box) {
            this.$box.remove();
        }

        if ($(data.dom).length == 0) {
            let oDiv = document.createElement('div');
            $(oDiv).addClass(data.dom.substr(1));
            document.body.appendChild(oDiv);
            $(data.dom).html(this.$box);
        } else {
            $(data.dom).html(this.$box);
        }

    }

    _addEvents() {
        let self = this;
        let $doc = $(document);


    }

    static choiceTab(route) {
        $('.tab-item').removeClass('active');
        $(`.tab_${route}`).addClass('active');
    }

};


Footertab.render = function(paraObj) {
    return Footertab.obj = new Footertab(paraObj);
}

Footertab.isFirstLoad = true;