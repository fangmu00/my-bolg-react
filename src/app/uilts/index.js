/* global window document */
// 读取localStorage
export const getLocalStorage = (name) => {
  if (window.localStorage) {
    return window.localStorage[name];
  }
  return null;
};

// 设置localStorage
export const setLocalStorage = (key, value) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, value);
  } else {
    console.log('不支持localStorage');
  }
};

// 设置cookie
export const setCookie = (key, value, days = 30) => {
  const exp = new Date();
  exp.setDate(exp + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${key}=${encodeURI(value)};expires=${exp.toGMTString()}`;
};

export const getCookie = (name) => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) {
    return decodeURI(arr[2]);
  }
  return null;
};

export const clearCookie = (name) => {
  setCookie(name, '', -1);
};

