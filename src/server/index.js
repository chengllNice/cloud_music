import axios from 'axios';
import Vue from 'vue';


let cancel_list = [];//用于存放所有请求
// 全局配置
const axios_config = {
  baseURL: '/api',
  timeout: 600000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};


const instace = axios.create(axios_config);
const CancelToken = axios.CancelToken;//取消请求
// 添加请求拦截器
instace.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  Vue.$message.error('接口请求报错了...嗯...');
  // 对请求错误做些什么
  return Promise.reject(error);
});


/*** 在请求数据之前的处理 暂时不用*/
let ajax_before = (type, data) => {

  if (typeof data === 'undefined') {
    data = {};
  }
  //主要针对数据进行进行一些公共化的处理
  let obj = {};
  let temp_obj = {};

};

let ajax_after = (result) => {
  return new Promise((resolve, reject) => {
    if (result.status == 200) {
      if (result.data.code == 200) {
        resolve(result.data);
      }
      /*//token 失效
      else if (result.data.code == 9996) {
        fblocalstorage.setStore('loginoverTime', 'true');
        ajax_abort_all();
        window.location.href = `${window.location.protocol}//${window.location.host}/login.html#/`;
      } */
      else {

        Vue.$Message.error(result.data.msg);
        reject(result.data);
      }
    } else {
      Vue.$Message.error('网络错误');
      reject(result.data);
    }
  })
};

export const ajax_get = (url, data) => {
  return instace.get(url, {
    params: data,
    cancelToken: new CancelToken(function(c) {
      cancel_list.push(c);
    })
  }).then((result)=>{
    // return result
    return ajax_after(result)
  })
};

/****
 * post 请求   用于新增
 */
export const ajax_post = (url, data) => {
  return instace.post({
    url: url,
    params: data.params,
    data: data.data,
    cancelToken: new CancelToken(function(c) {
      //这个executor函数接受一个cancel function作为参数
      cancel_list.push(c);
    })
  }).then(result => {
    // return result
    return ajax_after(result);
  })
};

/**
 * delete 请求   用于删除
 */
export const ajax_delete = (url, data) => {
  return instace.delete({
    url: url,
    params: data,
    cancelToken: new CancelToken(function(c) {
      //这个executor函数接受一个cancel function作为参数
      cancel_list.push(c);
    })
  }).then(result => {
    // return result
    return ajax_after(result);
  })
};

/**
 * put 请求    用于修改
 */
export const ajax_put = (url, data) => {
  return instace.put({
    url: url,
    params: data.params,
    data: data.data,
    cancelToken: new CancelToken(function(c) {
      //这个executor函数接受一个cancel function作为参数
      cancel_list.push(c);
    })
  }).then(result => {
    // return result
    return ajax_after(result);
  })
};
