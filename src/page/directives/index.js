import Vue from 'vue';
import loading from './loading'

let create = (options) => {
  let loadingComponent = Vue.extend(loading);
  let componentVue = {};
  return new Promise((resolve, reject) => {
    //实例化ConfirmConstructor组件
    componentVue = new loadingComponent({
      el: document.createElement('div')
    });
    for (let index in options) {
      componentVue[index] = options[index];
    }
    //返回vue实例
    // componentVue.$on('complete', () => {
    //   console.log('')
    //   resolve(componentVue)
    // })
    resolve(componentVue)
  })
};

let random_fn = (num) => {
  let arr = [];
  let len = num ? num : 1;
  for(let i = 0; i < len; i++){
    arr.push(Math.floor(Math.random()*10))
  }
  return arr.join('')
};

let directive = {};
directive.install = function (vue) {
  let _uid = '';
  vue.directive('loading',{
    // 钩子函数，被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
    inserted(el){
      // console.log( 'inserted' );
    },
    // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
    bind(el, binding, vnode){
      // let spinner = '';
      // create({
      //   value: binding.value
      // }).then(res=>{
      //   console.log(res,'res')
      //   spinner = res;
      // });
      let _uid = 'vue-directive-loading' + Date.now().toString('16') + random_fn(10);

      let _value = binding.value;
      let spinner = document.createElement('div');
      spinner.id = _uid;
      spinner.className = 'vue-directive-loading';
      spinner.style.position = 'absolute';
      spinner.style.top = '0';
      spinner.style.left = '0';
      spinner.style.width = '100%';
      spinner.style.height = '100%';
      spinner.style.background = 'rgba(255,255,255,0.8)';
      spinner.style.display = _value ? 'block' : 'none';
      spinner.innerHTML = `<div style="
           width: 100%;
           padding-top: 20px;
           padding-bottom: 20px;
           text-align: center;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 13px;">
           <img class="loading" src="../../../static/img/loading.svg"/>加载中...</div>`;

      el.style.position = 'relative';
      el.style.height = '0!important';

      // console.log(el,'bingging')
      el.appendChild(spinner)
    },
    // 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前。
    // 指令的值可能发生了改变也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
    update(el, binding, vnode){
      let spinner = el.getElementsByClassName('vue-directive-loading')[0];
      spinner.style.display = binding.value ? 'block' : 'none';
      // console.log( 'update' );
    },
    // 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。
    componentUpdated(el, binding, vnode){
      // console.log( 'componentUpdated' );
    },
    // 只调用一次，指令与元素解绑时调用。
    unbind(){
      console.log( 'unbind' );
    }
  });
};
export default directive


