export const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';

export const isObject= obj => Object.prototype.toString.call(obj) === '[object Object]';

export const isString = obj => Object.prototype.toString.call(obj) === '[object String]';

export const isFunc = obj => Object.prototype.toString.call(obj) === '[object Function]';

export const deepCopy = obj => JSON.parse(JSON.stringify(obj));
