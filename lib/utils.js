/**
 * utils 通用方法
 *
 * @author 材主<diamont1001@163.com>
 */

'use strict';

class Utils {

  static insertArray(arr, i, item) {
    arr.splice(i, 0, item);
  }

  // 判断是否对象，并且为非空和非 {}
  static isObjectNotEmpty(a) {
    if (typeof a === 'object' && !(a instanceof Array)) {
      for (const i in a) {
        return true;
      }
      return false;
    }
    return false;

  }

  /**
   * 格式化日期
   * @param {String} objDate 日期字符串或long型日期
   * @param {String} format 格式化字符串，如'YYYY-MM-DD hh:mm:ss'
   * @return {String} -
   */
  static formatDate(objDate, format) {
    const orignalDate = objDate;
    let date = null;

    if (/\d{9,10}/.test(objDate)) {
      date = new Date(parseInt(objDate + '000'));
    } else if (/\d{12,13}/.test(objDate)) {
      date = new Date(parseInt(objDate));
    } else {
      date = new Date(objDate + '');
    }

    if (!date || !date.getDate) { // 如果不是日期对象，则返回
      return orignalDate;
    }

    const o = {
      'M+': date.getMonth() + 1, // month
      'D+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds() // millisecond
    };

    if (/(Y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return format;
  }

}

module.exports = Utils;
