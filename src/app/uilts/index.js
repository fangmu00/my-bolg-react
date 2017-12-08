// 读取localStorage

/* global window */
export const getLocalStorage = (name) => {
  if (window.localStorage) {
    return window.localStorage[name];
  }
  return null;
};

// 设置localStorage
export const setLocalStorage = (key, value) => {
  if (window.localStorage) {
    window.localStorage[key] = value;
  } else {
    console.log('不支持localStorage');
  }
};
