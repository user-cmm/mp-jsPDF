/*
 * @Author: jrt 1148780375@qq.com
 * @Date: 2024-10-28 11:15:59
 * @LastEditors: jrt 1148780375@qq.com
 * @LastEditTime: 2024-10-28 16:35:42
 * @FilePath: \mp-jsPDF\src\libs\AtobBtoa.js
 * @Description:
 *
 * Copyright (c) 2024 by jrt, All Rights Reserved.
 */
import { globalObject } from "./globalObject.js";

var atob, btoa;

(function() {
  // @if WECHAT='true'
  atob = function(string) {
    string = String(string).replace(/[\t\n\f\r ]+/g, "");
    var b642 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    string += "==".slice(2 - (string.length & 3));
    var bitmap,
      result = "",
      r1,
      r2,
      i = 0;
    for (; i < string.length; ) {
      bitmap =
        (b642.indexOf(string.charAt(i++)) << 18) |
        (b642.indexOf(string.charAt(i++)) << 12) |
        ((r1 = b642.indexOf(string.charAt(i++))) << 6) |
        (r2 = b642.indexOf(string.charAt(i++)));
      result +=
        r1 === 64
          ? String.fromCharCode((bitmap >> 16) & 255)
          : r2 === 64
          ? String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255)
          : String.fromCharCode(
              (bitmap >> 16) & 255,
              (bitmap >> 8) & 255,
              bitmap & 255
            );
    }
    return result;
  };
  btoa = function(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return wx.arrayBufferToBase64(buf);
  };
  return;
  // @endif
  // @if MODULE_FORMAT!='cjs'
  atob = globalObject.atob.bind(globalObject);
  btoa = globalObject.btoa.bind(globalObject);
  return;
  // @endif

  // @if MODULE_FORMAT='cjs'
  atob = require("atob");
  btoa = require("btoa");
  // @endif
})();

export { atob, btoa };
