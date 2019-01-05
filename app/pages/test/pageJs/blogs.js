import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import Components from '../../../components'; // 调用组件模块
import Api from '../../../base/api/api.js';
// 导入页面
import goodsTpl from '../pageTpl/blogs.tpl';

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

const ajax = Components.Ajax.render({
	domain: 'localhost',
	errCb(res) {
		popup.alert({
			body: res.msg || '未知错误',
		})
	}
})


var blogsJs = {

	render(options) {

		Api.Route.setDocumentTitle('Blogs');

		let dom = template.compile(goodsTpl)({
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

		// ++++++++++++++++++++++++++++++++++++++++++

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

		Components.Refresh.render({
			parent: `.js-${options.route}`,
			cb() {
				popup.alert({
					body: 'confirm cb',
				})
			}
		});

		$route.on('click', '#btn-submit', (e) => {

			ajax.comAjax({
				URL: ajax.urlData.getPhp,
				isStringify: true,
				name: $('#uname').val(),
				content: $('#umsg').val(),
			}, (res) => {
				console.log(res);
				popup.tip({
					body: '提交成功',
				})
				self.getMessage(options);
			})

		})

		self.getMessage(options);

	},


	// function
	getMessage(options) {
		ajax.comAjax({
			URL: ajax.urlData.getMsg,
			isStringify: true,
		}, (res) => {
			console.log(res);

			let templateStr = `{{each data as item index}}<li class="li-item">
                    <div class="uname">{{item.name}}:</div>
                    <div class="umsg">{{item.message}}</div>
                    <hr>
                </li>{{/each}}`;

			$('.message-list').html(template.compile(templateStr)({data: res.data}));
			$('.php_form input').val('');
			$('.php_form textarea').val('');
		})
	}

}

export default blogsJs;