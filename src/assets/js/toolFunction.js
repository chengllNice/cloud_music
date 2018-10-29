
import localStorage from './local_storage'
import commonApi from './common_api_fn'

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
export const unitFormat = (data, key, len) => {
  if(!data){
    return;
  }
  let _len = len || 5;
  let _unit = '';
  let format_fn = (obj) => {
    let _value = Math.floor(getObjectValue(obj, key));
    if(_value.toString().length > _len){
      _value = Math.floor(_value / Math.pow(10,_len-1));
      _unit = '万';
    }
    obj[key] = _value + _unit;
  };
  if(typeOf(data) === 'array'){
    data.forEach(item=>{
      format_fn(item);
    })
  }else if(typeOf(data) === 'object'){
    format_fn(data);
  }
};

/*
* 根据uiconfig返回数据
* */
export const uiconfigFormat = (data, uiconfig) => {
  if(typeOf(uiconfig) === 'object' && typeOf(data) === 'array' && data.length){
    let result = [];
    data.forEach(item=>{
      let obj = {};
      Object.keys(uiconfig).forEach(key=>{
        let value = getObjectValue(item, uiconfig[key]);
        obj[key] = value;
      });
      result.push(obj);
    });
    return result;
  }
};

/*
* table数据取值
* */
export const tableListInit = (result, table_list) => {
  let result_len = result.length;
  let header = table_list.t_head;
  let table_len = header.length;
  table_list.t_body = [];
  if(typeOf(header[0]) === 'array'){
    for(let index = 0; index < table_len; index++){
      table_list.t_body[index] = [];
      for(let num = index*result_len/2; num < (index+1)*result_len/2; num++){
        let obj = {};
        for(let index_01 = 0; index_01 < header[index].length; index_01++){
          if (header[index][index_01].key != "operate") {
            obj[header[index][index_01].key] = getObjectValue(result[num], header[index][index_01].jpath);
          }
        }
        table_list.t_body[index].push(obj);
      }
    }
  }else if(typeOf(header[0]) === 'object'){
    for(let num = 0; num < result_len; num++){
      let obj = {};
      for(let index = 0; index< table_len; index++){
        if (header[index].key != "operate") {
          obj[header[index].key] = getObjectValue(
            result[num],
            header[index].jpath
          );
          if(header[index].key == 'duration'){
            obj[header[index].key] = timeFormat(obj[header[index].key])
          }
        }
      }
      table_list.t_body.push(obj)
    }
  }
};

/*
* 时间转换
* */
export const timeFormat = (msd) => {
  var time = parseFloat(msd) / 1000;
  let zeroFormat = (num) => {
    if(num<=9){
      num = '0' + num;
    }
    return num;
  };
  if (null != time && "" != time) {
    if (time > 60 && time < 60 * 60) {
      time = zeroFormat(parseInt(time / 60.0)) + ":" + zeroFormat(parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60));
    }
    else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time = zeroFormat(parseInt(time / 3600.0)) + ":" + zeroFormat(parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60)) + ":" +
        zeroFormat(parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60));
    }
    else {
      time = '00:' + zeroFormat(parseInt(time));
    }
  }else{
    time = '00:00'
  }
  return time;
};

export default {
  version: '0.0.1',
  install: function (Vue) {
    Vue.prototype.$deepClone = deepClone;
    Vue.prototype.$typeOf = typeOf;
    Vue.prototype.$setObjectValue = setObjectValue;
    Vue.prototype.$getObjectValue = getObjectValue;
    Vue.prototype.$unitFormat = unitFormat;
    Vue.prototype.$uiconfigFormat = uiconfigFormat;
    Vue.prototype.$tableListInit = tableListInit;
    Vue.prototype.$timeFormat = timeFormat;
    Vue.prototype.$localStorage = localStorage;
    Vue.prototype.$commonApi = commonApi;
  }
}
