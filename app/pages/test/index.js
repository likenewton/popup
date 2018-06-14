'use strict';

import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import Components from '../../components'; // 调用组件模块
import Api from '../../base/api/api.js';
import './style.scss';

// ++++++++++++++++++++
import errJs from './pageJs/err.js';
import alertJs from './pageJs/alert.js';
import blogsJs from './pageJs/blogs.js';
import tipJs from './pageJs/tip.js';
import swiperJs from './pageJs/swiper.js';


const pageJs = {
	errJs,
	alertJs,
	blogsJs,
	tipJs,
	swiperJs,
}
// ++++++++++++++++++++

// 彈框組件
const popup = Components.Popup.render({
	equipment: 'MOBILE', // 移动端框
	isShowCloseBtn: false,
	animateTime: 200,
	animateIn: 'fadeIn',
	animateOut: 'fadeOut',
});

const load = Components.Loading.render();

// 頁腳tab欄組件
const footertab = Components.Footertab.render({
	list: [{
		title: 'ALERT',
		route: 'alert',
		icon: 'icon-home',
		active: true,
	}, {
		title: 'BLOGS',
		route: 'blogs',
		icon: 'icon-user',
	}, {
		title: 'SWIPER',
		route: 'swiper',
		icon: 'icon-heart',
	}, {
		title: 'TIP',
		route: 'tip',
		icon: 'icon-setting',
	}]
})

// 頁面動畫配置 ['進入動畫', '消失動畫']
const ANIMATE_INFOS = [
	[], // 沒有動畫
	['fadeInRightBig', 'fadeOutLeftBig'],
	['fadeInRight', 'fadeOutLeft'],
	['slideInRight', 'slideOutLeft'],
]

class Index {

	constructor() {

		this.data = {
			A__PageRouteMap: { // 用来保存页面路由信息
				alert: {
					route: 'alert', // 路由名稱
					cache: true, // 是否頁面緩存
					animation: ANIMATE_INFOS[2], // 頁面出場/消失動畫
				},
				blogs: {
					route: 'blogs',
					cache: true,
					animation: ANIMATE_INFOS[2],
				},
				tip: {
					route: 'tip',
					cache: true,
					animation: ANIMATE_INFOS[2],
				},
				swiper: {
					route: 'swiper',
					cache: true,
					animation: ANIMATE_INFOS[2],
				},
				err: {
					route: 'err',
					cache: true,
					animation: ANIMATE_INFOS[0],
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
				self.pageChangeRender(self.data.A__PageRouteMap[route] || self.data.A__PageRouteMap['err']);
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
		$('.js-routePage').removeClass(options.animation[0]).addClass(options.animation[1]);
		if (options.animation[0]) {
			$('.js-routePage').fadeOut(420);
		} else {
			$('.js-routePage').hide();
		}
		// ++++++++++++++++++++
		pageJs[`${options.route}Js`].render(options);
		// ++++++++++++++++++++
	}

	// 页面第一次加载
	firstRender() {
		let hash = Api.Tool.getHash();
		let route = hash.split('__')[1];

		if (hash) {
			// 如果找不到指定的route, 就跳转404页面
			route = this.data.A__PageRouteMap[route] ? route : 'err';
			location.href = location.href.substr(0, '#__') + '#__' + route;
		} else {
			// 在没有路由时默认添加一个路由地址
			location.href = location.href + '#__alert';
		}
	}

}

new Index();