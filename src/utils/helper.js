import Taro, { hideToast } from "@tarojs/taro";
import config from "../config/index";
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

const sessionKey = "taro-js-session";
let reLoginTime = 1;

const helper = {
  staticPath: "http://statics.zhuishushenqi.com",
  isEmpty(value) {
    return typeof value === "undefined" || value === null || value === "";
  },

  debounce(fn, delay = 500) {
    // 防抖执行函数
    let handle;
    return function(e) {
      // 取消之前的延时调用
      clearTimeout(handle);
      handle = setTimeout(() => {
        fn(e);
      }, delay);
    };
  },

  config(key) {
    // 获取配置信息
    return config[key];
  },

  log(message, type = "log") {
    switch (type) {
      case "log":
        console.log(message);
        break;
      case "error":
        console.error(message);
        break;
      default:
        console.log(message);
    }
  },

  requestParams(url, data = {}, method = "GET", params = {}) {
    // 请求头
    const URL = url.startsWith("http") ? url : `${helper.config("host")}${url}`;
    return {
      ...params,
      ...{
        method: method,
        url: URL,
        data: data
        // header: {
        //   authorization: helper.getSession(),
        //   appid: helper.config("appId")
        // }
      }
    };
  },
  getParams(url, data, params = {}) {
    return helper.requestParams(url, data, "GET", params);
  },
  postParams(url, data, params = {}) {
    return helper.requestParams(url, data, "POST", params);
  },
  putParams(url, data, params = {}) {
    return helper.requestParams(url, data, "PUT", params);
  },
  deleteParams(url, data, params = {}) {
    return helper.requestParams(url, data, "DELETE", params);
  },
  setSession(value) {
    Taro.setStorageSync(sessionKey, value);
  },

  ajax(meth) {
    return new Promise((resolve, reject) => {
      try {
        Taro.request(meth).then(res => {
          console.log("结果start");
          console.log(res);
          switch (res.statusCode) {
            case 200:
              resolve(res.data);
              break;
            case 401:
              reject(res.errMsg);
              helper.toast(res.errMsg);
              break;
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },

  toast(title, icon = "none", duration = "1500") {
    Taro.showToast({
      title: title,
      icon: icon,
      duration: duration
    });
  },

  getSession() {
    return Taro.getStorageSync(sessionKey);
  },
  formatTime(timeStamp, format = "Y-M-D h:m:s") {
    let formateArr = ["Y", "M", "D", "h", "m", "s"];
    let returnArr = [];

    let number = timeStamp || 0;

    let date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));
    for (let i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  },
  timeStamp() {
    return parseInt(new Date().getTime() / 1000);
  }
};

export default helper;
