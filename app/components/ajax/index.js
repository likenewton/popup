import $ from 'jquery/dist/jquery.min';

export default class Ajax {
  constructor(param) {

    this.data = {
      domain: 'default',
      jsonpCb: 'callback',
    }

    this.urlData = {
      // 存放ajax地址
      getBindTel: '/frontend/getBindTel', // 获取绑定的手机号
      telLogin: '/frontend/telLogin', // 绑定手机
      getMsgValidCode: '/frontend/getNewMsgValidCode', // 获取短信验证码
    }

    this.domain = {
      default: '', // 默认使用的域名
      localhost: 'http://123.207.111.90:8081',
    }

    this.setData(param);

  }

  setData(data, info) {
    let oldData = this[info || 'data'];
    let newData = $.extend(oldData, data);
    this[info || 'data'] = newData;
  }

  /**
   *
   * @param paraObj = {
   * url: ajax地址(必需)，
   * }
   * @param callback
   */
  comAjax(paraObj, sucCb, errCb) {
    let _this = this;
    // 将不需要的参数去掉
    let deepCopy = $.extend(true, {}, paraObj);
    // ['URL', 'TYPE', 'dataType', 'async', 'contentType', 'timeOut'].forEach((attr) => {
    //   Reflect.deleteProperty(deepCopy, attr);
    // })
    // 因兼容性问题，暂时使用下面的写法
    let arr = ['URL', 'TYPE', 'dataType', 'async', 'contentType', 'timeOut', 'isStringify'];
    for(var i = 0; i < arr.length; i++) {
      delete deepCopy[arr[i]]
    }

    $.ajax({
      url: `${_this.domain[_this.data.domain]}${paraObj.URL}`,
      type: paraObj.TYPE || 'POST',
      dataType: paraObj.dataType || '',
      contentType: paraObj.contentType || "application/x-www-form-urlencoded; charset=UTF-8",     
      async: paraObj.async || true,
      timeout: paraObj.timeOut || 10000,
      data: paraObj.isStringify ? JSON.stringify(deepCopy) : deepCopy,
      success: (res) => {
        _this.validate(res, sucCb, errCb);
      },
    })
  }

  jsonp(paraObj, sucCb, errCb) {
    let _this = this;
    // 将不需要的参数去掉
    let deepCopy = $.extend(true, {}, paraObj);

    // ['URL', 'dataType', 'async', 'contentType', 'timeOut'].forEach((attr) => {
    //   Reflect.deleteProperty(deepCopy, attr);
    // })
    let arr = ['URL', 'dataType', 'async', 'contentType', 'timeOut'];
    for(var i = 0; i < arr.length; i++) {
      delete deepCopy[arr[i]]
    }

    $.ajax({
      url: _this.getJsonpUrl(paraObj.URL, deepCopy),
      type: 'GET',
      dataType: 'jsonp',
      contentType: paraObj.contentType || "application/x-www-form-urlencoded; charset=UTF-8",
      jsonp: _this.data.jsonpCb, //服务端用于接收callback调用的function名的参数  
      async: paraObj.async || true,
      timeout: paraObj.timeOut || 10000,
      success: (res) => {
        _this.validate(res, sucCb, errCb);
      },
      error: (res) => {
        console.log(res);
      }
    })
  }

  /**
   * 数据验证
   */
  validate(res, sucCb, errCb) {

    if (typeof res == 'string') res = JSON.parse(res);

    if (res.res === 0 && !res.msg) {
      sucCb && sucCb(res);
    } else {
      if (errCb) { // 单独类型的错误回调优先级高于实例化参数中的错误回调
        errCb(res);
      } else if(this.data.errCb) {
        this.data.errCb(res);
      } else {
        alert(res.msg);
      }
    }
  }

  getJsonpUrl(path, data, isClearNull) {
    let url = `${this.domain[this.data.domain]}${path}`;
    let searchStr = '';

    for (let key in data) {
      if (isClearNull && !data[key]) continue;
      searchStr += '&' + key + '=' + data[key];
    }

    if (searchStr.length > 0) {
      searchStr = '?' + searchStr.substr(1);
    }
  
    return url + searchStr;
  }


  static render(param) {
    return new Ajax(param);
  }


}

