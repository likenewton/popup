import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import Components from '../../../components'; // 调用组件模块
import Api from '../../../base/api/api.js';
// 导入页面
import pageTpl from '../pageTpl/swiper.tpl';

let pageData = {
	isFirstLoad: true, // 默认页面是第一次加载
}

// 弹框初始化属性
const popup = Components.Popup.render({
	equipment: 'MOBILE', // 移动端框
	isShowCloseBtn: false,
	animateIn: 'fadeIn',
	animateOut: 'fadeOut',
	animateTime: 200,
});


var swiperJs = {

	render(options) {

		Api.Route.setDocumentTitle('Ailsa的旅游计划');

		// dom 此时只是简单的html字符串
		let dom = template.compile(pageTpl)({
			pageData: {
				route: options.route,
				animation: options.animation[0],
			}
		})

		let $page = $(`body .js-${options.route}`);
		if (options.cache) {
			// 如果页面是需要缓存的
			if ($page.length === 0) {
				$('.page-container').append(dom);
			} else {
				$page.removeClass(options.animation[1]).addClass(options.animation[0]);
				if (options.animation[0]) {
					$page.fadeIn(420);
				} else {
					$page.show();
				}
			}
		} else {
			// 如果页面不需要缓存，每次加载路由都更新一遍
			if ($page.length === 0) {
				$('.page-container').append(dom);
			} else {
				$page.remove();
				$('.page-container').append(dom);
			}
		}

		// 如果有底部tab栏
		Components.Footertab.choiceTab(options.route);

		// 添加事件(只在第一次页面加载的时候或者页面cache == false的时候)
		if (pageData.isFirstLoad || !options.cache) this.initEvent(options);
	},

	initEvent(options) {
		pageData.isFirstLoad = false;
		// 此处的代码只能被执行一次
		let self = this;
		let $route = $(`.js-${options.route}`);

		// 下拉刷新
		Components.Refresh.render({
			parent: `.js-${options.route}`,
			cb() {
				popup.alert({
					body: '下载刷新成功！'
				})
			}
		});

		// 轮播图
		Components.Swiper.render({
			dom: '.js-Swiper',
			effect: 'coverflow',
			slidesPerView: 2,
			imgList: [
				`${require('../../../static/img/yinyi/yinyi_swiper_01.png')}`,
				`${require('../../../static/img/yinyi/yinyi_swiper_02.png')}`,
				`${require('../../../static/img/yinyi/yinyi_swiper_03.png')}`,
				`${require('../../../static/img/yinyi/yinyi_swiper_04.png')}`,
			],
		})
		Components.Swiper.render({
			dom: '.js-Swiper_1',
			effect: 'cube',
			imgList: [
				`${require('../../../static/img/yinyi/yinyi_carousel_01.png')}`,
				`${require('../../../static/img/yinyi/yinyi_carousel_02.png')}`,
				`${require('../../../static/img/yinyi/yinyi_carousel_03.png')}`,
				`${require('../../../static/img/yinyi/yinyi_carousel_04.png')}`,
				`${require('../../../static/img/yinyi/yinyi_carousel_05.png')}`,
			]
		})
		Components.Swiper.render({
			dom: '.js-Swiper_2',
			effect: 'flip',
			imgList: [
				`${require('../../../static/img/yinyi/yinyi_house_out_01.png')}`,
				`${require('../../../static/img/yinyi/yinyi_house_out_02.png')}`,
			]
		})
		Components.Swiper.render({
			dom: '.js-Swiper_3',
			effect: 'flip',
			imgList: [
				`${require('../../../static/img/yinyi/yinyi_01.png')}`,
				`${require('../../../static/img/yinyi/yinyi_02.png')}`,
				`${require('../../../static/img/yinyi/yinyi_03.png')}`,
				`${require('../../../static/img/yinyi/yinyi_04.png')}`,
				`${require('../../../static/img/yinyi/yinyi_05.png')}`,
			]
		})
		Components.Swiper.render({
			dom: '.js-Swiper_4',
			effect: 'coverflow',
			slidesPerView: 1.5,
			imgList: [
				`${require('../../../static/img/yinyi/yinyi_li_01.png')}`,
				`${require('../../../static/img/yinyi/yinyi_li_02.png')}`,
				`${require('../../../static/img/yinyi/yinyi_li_03.png')}`,
				`${require('../../../static/img/yinyi/yinyi_li_04.png')}`,
				`${require('../../../static/img/yinyi/yinyi_li_05.png')}`,
				`${require('../../../static/img/yinyi/yinyi_li_06.png')}`,
				`${require('../../../static/img/yinyi/yinyi_li_07.png')}`,
			]
		})
		Components.Swiper.render({
			dom: '.js-Swiper_5',
			imgList: [
				`${require('../../../static/img/yinyi/yinyi_f_01.png')}`,
				`${require('../../../static/img/yinyi/yinyi_f_02.png')}`,
				`${require('../../../static/img/yinyi/yinyi_f_03.png')}`,
				`${require('../../../static/img/yinyi/yinyi_f_04.png')}`,
				`${require('../../../static/img/yinyi/yinyi_f_05.png')}`,
				`${require('../../../static/img/yinyi/yinyi_f_06.png')}`,
			]
		})

	}

}

export default swiperJs;