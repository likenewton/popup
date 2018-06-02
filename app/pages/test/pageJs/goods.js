import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import Components from '../../../components'; // 调用组件模块
import Api from '../../../base/api/api.js';
// 导入页面
import goodsTpl from '../pageTpl/goods.tpl';

let pageData = {
	isFirstLoad: true,
}

var goodsJs = {

	render(options) {

		Api.Route.setDocumentTitle('title_goods');

		let dom = template.compile(goodsTpl)({
			pageData: {
				route: options.route,
				animation: options.animation,
			}
		})

		let $page = $(`body .js-${options.route}`);
		if (options.cache) {
			// 如果页面是需要缓存的
			if ($page.length === 0) {
				$('body').append(dom);
			} else {
				$page.show();
			}
		} else {
			// 如果页面不需要缓存，每次加载路由都更新一遍
			if ($page.length === 0) {
				$('body').append(dom);
			} else {
				$page.remove();
				$('body').append(dom);
			}
		}

		// 添加事件
		if (pageData.isFirstLoad || !options.cache) this.initEvent(options);
	},

	initEvent(options) {
		pageData.isFirstLoad = false;
		// 此处的代码只能被执行一次
		let self = this;
		let $route = $(`.js-${options.route}`);

		$route.on('click', 'button', (e) => {
			alert('我被点击了')
		})

	}

}

export default goodsJs;