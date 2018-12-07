import Vue from 'vue';
import toolModalFeeComponent from './tool_modal_fee.vue';

const toolModalFeeConstructor = Vue.extend(toolModalFeeComponent);

const toolModalFee_init = (target) => {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};

let initInstance = () => {
  //实例化ConfirmConstructor组件
  let instance = new toolModalFeeConstructor({
    el: document.createElement('div')
  });
  //添加到boby
  document.body.appendChild(instance.$el);
  let xh = setTimeout(function () {
    if (instance.isHide) {
      instance.show = false;
      this.close();
    }
    clearTimeout(xh);
  }, 3000);

  return instance;
};

let toolModalFee = (options = {}) => {
  //初始化
  let _instance= initInstance();
  // 将单个 confirm instance 的配置合并到默认值(instance.$data,就是main.vue里面的data)中
  toolModalFee_init(_instance.$data,options);
  //返回Promise
  return new Promise((resolve, reject) => {
    _instance.success = () => {
      if(_instance.$el.parentNode)
        _instance.$el.parentNode.removeChild(_instance.$el);
      _instance.show = false;
      //再执行自定义函数
      resolve(_instance.data);
    }
    _instance.cancel = () => {
      if(_instance.$el.parentNode)
        _instance.$el.parentNode.removeChild(_instance.$el);
      _instance.show = false;
      reject();
    }
  });
};

export default toolModalFee;
