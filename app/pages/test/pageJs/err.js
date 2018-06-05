import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import Components from '../../../components'; // 调用组件模块
import Api from '../../../base/api/api.js';
// 导入页面
import pageTpl from '../pageTpl/err.tpl';

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


var errJs = {

	render(options) {

		Api.Route.setDocumentTitle('error');

		let dom = template.compile(pageTpl)({
			pageData: {
				route: options.route,
				animation: options.animation,
			}
		})

		let $page = $(`body .js-${options.route}`);
		if (options.cache) {
			// 如果页面是需要缓存的
			if ($page.length === 0) {
				$('.page-container').append(dom);
			} else {
				$page.show();
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

	}

}

export default errJs;