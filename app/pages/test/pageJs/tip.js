import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import Components from '../../../components'; // 调用组件模块
import Api from '../../../base/api/api.js';
// 导入页面
import skuTpl from '../pageTpl/tip.tpl';

let pageData = {
	isFirstLoad: true,
}

// 弹框初始化属性
const popup = Components.Popup.render({
	equipment: 'MOBILE', // 移动端框
	isShowCloseBtn: false,
	animateIn: 'fadeIn',
	animateOut: 'fadeOut',
	animateTime: 200,
});


var tipJs = {

	render(options) {

		Api.Route.setDocumentTitle('tip');

		let dom = template.compile(skuTpl)({
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
				$page.removeClass(options.animation[1]).addClass(options.animation[0]).fadeIn(420);
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

		// 添加事件
		if (pageData.isFirstLoad || !options.cache) this.initEvent(options);
	},

	initEvent(options) {
		pageData.isFirstLoad = false;
		// 此处的代码只能被执行一次
		let self = this;
		let $route = $(`.js-${options.route}`);

		$route.on('click', '.list li', (e) => {
			let $btn = $(e.currentTarget);
			let className = $btn.attr('class');

			switch (className) {
				case 'tip_1':
					popup.tip({
						body: '这是一个tip',
					})
					break;
			}
		})

	}

}

export default tipJs;