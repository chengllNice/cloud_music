

/**
 * 深度克隆一个对象
 * @param {*} obj
 */
export const deepClone = function(obj) {
  // 判断原对象是否存在
  if (obj) {
    let newObj = JSON.parse(JSON.stringify(obj));
    return newObj;
  }
};

/*******
 * 判断类型
 */
export const typeOf = (obj) => {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

export default {
  version: '0.0.1',
  install: function (Vue) {
    Vue.prototype.$deepClone = deepClone;
    Vue.prototype.$typeOf = typeOf;
  }
}
