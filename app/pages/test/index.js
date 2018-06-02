'use strict';

import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import Components from '../../components'; // 调用组件模块
import Api from '../../base/api/api.js';
import './style.scss';

// ++++++++++++++++++++
import alertJs from './pageJs/alert.js';
import confirmJs from './pageJs/confirm.js';
import tipJs from './pageJs/tip.js';


const pageJs = {
	alertJs,
	confirmJs,
	tipJs,
}
// ++++++++++++++++++++

const popup = Components.Popup.render({
	equipment: 'MOBILE', // 移动端框
	isShowCloseBtn: false,
	animateTime: 200,
	animateIn: 'fadeIn',
	animateOut: 'fadeOut',
});

const footertab = Components.Footertab.render({
	list: [
		{
			title: 'ALERT',
			route: 'alert',
			active: true,
		},
		{
			title: 'CONFIRM',
			route: 'confirm',
		},
		{
			title: 'TIP',
			route: 'tip',
		}
	]
})

class Index {

	constructor() {

		this.data = { // 用来保存页面路由信息
			A__PageRouteMap: {
				alert: {
					route: 'alert', // 路由名稱
					cache: false, // 是否頁面緩存
				},
				confirm: {
					route: 'confirm',
					cache: false,
				},
				tip: {
					route: 'tip',
					cache: false,
				}
			},
		}
		this._init();
		this._initEvent();

	}

	_init() {
		let self = this;

		self.firstRender();

		Api.Route.listenerRouteChange((e) => {
			// 路由改变时的回调函数(js-link或者前进后退触发)
			let hash = Api.Tool.getHash();
			if (hash) {
				let route = hash.split('__')[1];
				self.pageChangeRender(self.data['A__PageRouteMap'][route]);
			}
		});

	}

	// event
	_initEvent() {
		let self = this;

		$(document).on('click', 'a.js-link', (e) => {
			e.preventDefault();
			let $btn = $(e.currentTarget);
			self.routeLinkTo($btn, 1);
		})

	}

	// function
	/*
	 * $btn 路由按钮
	 * type 路由类型(1: 普通路由)
	 */
	routeLinkTo($btn, type) {
		// a标签跳转页面必须要有data-route属性
		let routeName = $btn.attr('data-route');

		if (!routeName) {
			console.log(popup)
			popup.alert({
				title: '错误',
				body: '路由名称不存在',
			})
			return
		}

		location.href = location.href.substr(0, '#__') + '#__' + routeName;

	}

	// tpl頁面渲染
	pageChangeRender(options) {

		let self = this;

		//加载页面渲染方法
		$('.js-routePage').hide();
		// ++++++++++++++++++++
		pageJs[`${options.route}Js`].render(options);
		// ++++++++++++++++++++
	}

	// 页面第一次加载
	firstRender() {
		let hash = Api.Tool.getHash();

		if (hash) {
			location.href = location.href.substr(0, '#__') + '#__' + hash.split('__')[1];
		} else {
			location.href = location.href + '#__alert';
		}
	}

}

new Index();