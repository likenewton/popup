'use strict';

import template from 'art-template/dist/template.js';
import $ from 'jquery/dist/jquery.min';
import FastClick from 'fastclick';
import '../style/base.scss';

template.config('escape', false);

// fastclick
$(function() {
  FastClick.attach(document.body);
});

  // rem
  ! function(win) {
    var win_doc = win.document,
      win_doc_doc = win_doc.documentElement,
      psd_w = 750 / 100,
      evt_fn = "orientationchange" in win ? "orientationchange" : "resize",
      set_size = function() {
        var page_w = win_doc_doc.clientWidth || 320;
        page_w > 750 && (page_w = 750),
          win_doc_doc.style.fontSize = page_w / psd_w + "px";
      };
    set_size();
    win_doc.addEventListener && (win.addEventListener(evt_fn, set_size, !1), win_doc.addEventListener("DOMContentLoaded", set_size, !1));
  }(window);

// 路由
const Route = {

  listenerRouteChange: function (cb) {
    //监听路由前进后退变化
    window.addEventListener("popstate", function (e) {
      cb && cb(e);//把路由放出来进行页面逻辑处理
    }, false);
  },

  setDocumentTitle: function (titleStr) {
    var $body = $('body');
    document.title = titleStr;
    var $iframe = $(`<iframe style='display:none;' src=''></iframe>`);
    $iframe.on('load', function () {
      setTimeout(function () {
        $iframe.off('load').remove();
      }, 0);
    }).appendTo($body);
  },

}

// 工具包
const Tool = {
  // 获取查询字符串
  getQuery(attr) {
    let href = location.href;
    let queryStr = href.substr(href.indexOf('?') + 1);
    let queryArr = queryStr.split('&');
    let queryObj = {};

    queryArr.forEach(v => {
      let tplArr = v.split('=');
      queryObj[tplArr[0]] = tplArr[1];
    })

    if (attr) return queryObj[attr];
    else return queryObj;
  },

  // 获取地址hash值
  getHash: function () {

    var herf = window.location.href;
    var hash = null;
    if (herf.indexOf('?') > -1) {//带参数
      hash = window.location.hash.split('?')[0];
    } else {
      hash = window.location.hash;
    }
    return hash;
  },

  // 获取签名
  getSign(paras, type, format = 'easy') {
    let key1 = 'c3466e7a360349e492437598f4d8478e';
    let key2 = 'a1555ef8cdd245cbac8471e2273716d4';
    let sign = '';
    let newKey = Object.keys(paras).sort();
    for (var i = 0; i < newKey.length; i++) {
      if (paras[newKey[i]]) {
        if (format == 'easy') {
          sign += `&${newKey[i]}=${paras[newKey[i]]}`
        } else if (format == 'complex') {
          sign += paras[newKey[i]];
        }
      }
    }

    if (type == 'key1') {
      if (format == 'easy') {
        sign += `&key=${key1}`;
      } else if (format == 'complex') {
        sign += key1;
      }

    } else if (type == 'key2') {
      if (format == 'easy') {
        sign += `&key=${localStorage.getItem('appId')}${key2}`;
      } else if (format == 'complex') {
        sign += `${localStorage.getItem('appId')}${key2}`;
      }

    }

    if (format == 'easy') {
      sign = sign.substring(1);
    }

    console.log(sign)
    sign = md5(sign).toLowerCase();
    console.log(sign)
    return sign
  },

  // 对是否是微信页面进行渲染 Tcb必传 Fcb有默认属性，可不传
  isWeixin(Tcb, Fcb) {
    if (Share.isWXApp()) {
      Tcb && Tcb();
      return true
    } else {
      setTimeout(function() {
        popup.alert({
          body: '请使用微信登录！',
        })
      }, 0)
      Fcb && Fcb();
    }
  }

}

module.exports = {
  Route, // 路由
  Tool,
}