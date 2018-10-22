

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
};


/**
 * 设置对象的值
 * 返回一个对象，给对象增加属性与值
 * @param {传入的对象} obj
 * @param {传入的jpath} text
 * @param {设置的值} value
 */
export const setObjectValue = function(obj, text, value) {
  try {
    if (text == '')
      return obj;
    let textArray = text.split('.');
    let set_value = function(temp_obj, textArray) {
      let key = textArray.shift();
      if (!temp_obj[key])
        temp_obj[key] = {};
      if (textArray.length == 0) {
        temp_obj[key] = value;
        return obj;
      }
      return set_value(temp_obj[key], textArray);
    }
    return set_value(obj, textArray);
  } catch (error) {
    console.log(error);
  }
}
/*export const setObjectValue = (obj, key, value) => {
  let _obj = obj;
  if(typeOf(_obj) === 'object'){
    let _obj_data = _obj.data || [];
    if(typeOf(_obj_data) === 'array' && _obj_data.length){
      _obj_data.forEach(item=>{
        Object.keys(item).forEach(item_key=>{
          if(item_key == key){
            item[item_key] = value;
            return;
          }
        })
      })
    }else{
      Object.keys(_obj).forEach(item_key=>{
        if(item_key == key){
          _obj[item_key] = value;
          return;
        }
      })
    }
  }
  return _obj;
};*/

/**
 * 获取对象的值
 * 给对象绑定一个方法，返回传入字符串的对象的值,
 * @param {解析的对象} obj
 * @param {传入的jpath 'aa.bb.cc'} text
 *
 * 解析失败返回''
 */
export const getObjectValue = function(obj, text) {
  try {
    // console.log(text);
    // console.log(obj);
    if ((typeOf(obj) === 'object' || typeOf(obj) === 'array') && text) {
      let textArray = text.split('.');
      let get_value = function(obj, textArray) {
        let key = textArray.shift();
        if (key.length < 5 && parseInt(key)) {
          key = parseInt(key);
        }
        if (typeof obj[key] == 'undefined' || obj[key] == null) {
          return '';
        }
        if (textArray.length == 0) {
          return obj[key];
        }
        obj = obj[key];
        return get_value(obj, textArray);
      }
      return get_value(obj, textArray);
    }
    return '';
  } catch (error) {
    // debugger
    console.log(error);
  }
}
/*export const getObjectValue = (obj, id, key) => {
  let _obj = obj;
  let _value = '';
  if(!id){
    return _obj;
  }
  if(typeOf(_obj) === 'object'){
    let _obj_data = _obj.data || [];
    if(typeOf(_obj_data) === 'array' && _obj_data.length){
      _obj_data.forEach(item=>{
        Object.keys(item).forEach(item_key=>{
          if(item_key == key){
            item[item_key] = value;
            return;
          }
        })
      })
    }else{
      _value = _obj[key];
    }
  }
  return _value;
};*/


/*
* unit单位格式化
* */
export const unitFormat = (obj, len) => {
  let _len = len || 5;
  let _unit = obj.unit || '';
  let _value = getObjectValue(obj, "value");
  if(_value.length > _len){
    _value = Math.floor(_value / Math.pow(10,_len-1));
    _unit = '万';
  }
  obj.unit = _unit;
  obj.value = _value;
};

export default {
  version: '0.0.1',
  install: function (Vue) {
    Vue.prototype.$deepClone = deepClone;
    Vue.prototype.$typeOf = typeOf;
    Vue.prototype.$setObjectValue = setObjectValue;
    Vue.prototype.$getObjectValue = getObjectValue;
    Vue.prototype.$unitFormat = unitFormat;
  }
}
