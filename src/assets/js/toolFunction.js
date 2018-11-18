
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
    let _value = Math.floor(getObjectValue(obj, key)-0);
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
  return table_list;
};

/*
* 时间转换
* */
export const timeFormat = (msd, type) => {
  var time = '';
  let zeroFormat = (num) => {
    if(num<=9){
      num = '0' + num;
    }
    return num;
  };
  if(type){
    let _date = new Date(msd);
    let now_date = new Date();
    let now_y = now_date.getFullYear();
    let now_m = zeroFormat(now_date.getMonth()+1);
    let now_d = zeroFormat(now_date.getDate());
    let now_time = now_date.getTime();
    let _date_time = _date.getTime();
    let y = _date.getFullYear();
    let m = zeroFormat(_date.getMonth()+1);
    let d = zeroFormat(_date.getDate());

    let _h = zeroFormat(_date.getHours());
    let _m = zeroFormat(_date.getMinutes());
    let _s = zeroFormat(_date.getSeconds());

    if(type == 'comment'){
      let dis_time = now_time - _date_time;
      //计算出相差天数
      let dis_days=Math.floor(dis_time/(24*3600*1000));
      if(now_y == y && now_m == m && now_d == d){
        //计算出小时数
        let leave1=dis_time%(24*3600*1000);    //计算天数后剩余的毫秒数
        let dis_hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        let leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        let dis_minutes=Math.floor(leave2/(60*1000));
        //计算相差秒数
        let leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
        let dis_seconds=Math.round(leave3/1000);
        if(dis_hours == 0){
          time = `${dis_minutes}分钟前`;
          if(dis_minutes == 0){
            time = `刚刚`;
          }
        }else{
          time = `${_h}:${_m}`;
        }
      }else if(dis_days == 0){
        time = `昨天 ${_h}:${_m}`
      }else{
        time = `${m}月${d}日 ${_h}:${_m}`;
      }
    }else{
      let y_i = type.indexOf('yy');
      let m_i = type.indexOf('mm');
      let d_i = type.indexOf('dd');

      let _h_i = type.indexOf('hh');
      let _m_i = type.lastIndexOf('mi');
      let _s_i = type.indexOf('ss');

      let y_m = type.substring(m_i-1,m_i);
      let m_d = type.substring(d_i-1,d_i);
      let d_d = type.substring(d_i+2,d_i+3);

      let h_m = type.substring(_m_i-1,_m_i);
      let m_s = type.substring(_s_i-1,_s_i);

      if(y_i<0){
        y = '';
        y_m = '';
      }
      if(m_i<0){
        m = '';
        m_d = '';
      }
      if(d_i<0){
        d = ''
      }
      if(d_d == ''){
        d_d = ' '
      }
      if(_h_i<0){
        _h = '';
        h_m = '';
      }
      if(_m_i<0){
        _m = '';
        m_s = '';
      }
      if(_s_i<0){
        _s = '';
      }
      time = `${y}${y_m}${m}${m_d}${d}${d_d}${_h}${h_m}${_m}${m_s}${_s}`;
    }
  }else{
    time = parseFloat(msd) / 1000;

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
