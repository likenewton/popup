import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import Components from '../../../components'; // 调用组件模块
import Api from '../../../base/api/api.js';
// 导入页面
import pageTpl from '../pageTpl/alert.tpl';

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

var alertJs = {
	// 每一次hash 的跳轉都會執行(並且只會執行render)一次
	render(options) {
		// 设置页面标题
		Api.Route.setDocumentTitle('alert');

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

		// +++++++++++++++++++++ 如果需要加载下拉刷新
		if (pageData.isFirstLoad || !options.cache) {
			Components.Refresh.render({
				parent: `.js-${options.route}`,
				cb() {
					popup.alert({
						body: 'alert cb'
					})
				}
			});
		}
		// +++++++++++++++++++++++++++++++++++++++++++++

		// +++++++++++++++++++++ 如果有底部tab栏
		if ($('.js-Footertab').length > 0) {
			Components.Footertab.choiceTab(options.route);
			$(`.js-${options.route}`).css({
				paddingBottom: $('.js-Footertab').height(),
			});
		}
		// +++++++++++++++++++++++++++++++++++++++++++++

		// 添加事件(第一次加载||页面不需要设置缓存的时候)
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
				case 'alert_1':
					popup.alert({
						body: '我是默认的alert',
					})
					break;
				case 'alert_2':
					popup.alert({
						body: '我是有回调函数的',
						okHide() {
							alert('我要被关闭了')
						}
					})
					break;
				case 'alert_3':
					popup.alert({
						body: '我将从上往下进入你的视野',
						animateIn: 'bounceInDown',
						animateOut: 'bounceOutUp',
						animateTime: 400,
					})
					break;
				case 'alert_4':
					popup.alert({
						body: '我将从上往下进入你的视野，更慢了',
						animateIn: 'bounceInDown',
						animateOut: 'bounceOutUp',
						animateTime: 800,
					})
					break;
				case 'alert_5':
					popup.alert({
						body: '我已经不是默认的标题和确定按钮文案了',
						title: '新设置的标题',
						okBtn: '新的按钮文案',
					})
					break;
				case 'alert_6':
					popup.alert({
						body: '关闭后会有一个回调函数',
						okHiden() {
							alert('我已经被关闭了')
						}
					})
					break;
				case 'alert_7':
					popup.alert({
						equipment: 'COMPUTER',
						body: '我是PC端的弹框, 其他效果可以与移动端一样配置',
					})
					break;
				case 'alert_8':
					popup.alert({
						equipment: 'COMPUTER',
						isShowCloseBtn: true,
						body: '我是PC端的弹框, 加了关闭的x',
					})
					break;
				case 'alert_9':
					popup.alert({
						equipment: 'COMPUTER',
						isShowBackground: false,
						body: '我是PC端的弹框, 没有遮罩层哦',
					})
					break;
				case 'alert_10':
					popup.alert({
						equipment: 'COMPUTER',
						animateIn: 'rotateIn',
						animateOut: 'rotateOut',
						body: '只要是animate.css动画属性你都可以运用',
						animateTime: 800,
					})
					break;
				case 'alert_11':
					popup.alert({
						equipment: 'COMPUTER',
						body: '弹框展示之后会有一个回调函数',
						shown() {
							alert('弹框已经展示完毕啦')
						}
					})
					break;
				case 'alert_12':
					popup.alert({
						body: '弹框里面的内容需要template渲染 {{each data as item}}<p>{{item.name}}的age是{{item.age}}</p>{{/each}}',
						tplData: [{
							name: 'Newton',
							age: 20
						}, {
							name: 'Lucy',
							age: 30
						}, {
							name: 'Tom',
							age: 40
						}, ],
					})
					break;
				case 'alert_13':
					popup.confirm({
						equipment: 'COMPUTER',
						body: '在取消按钮之后会有一个回调',
						cancelHiden() {
							alert('我被取消了')
						}
					})
					break;
			}
		})

	}

}

export default alertJs;