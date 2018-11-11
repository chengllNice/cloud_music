let directive = {};
directive.install = function (vue) {
  let _uid = 'vue-directive-loading' + Date.now().toString('16')
  vue.directive('loading',{
    // 钩子函数，被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
    inserted(el){
      el.focus()
      // console.log( 'inserted' );
    },
    // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
    bind(el, binding, vnode){
      let _value = binding.value;
      let spinner = document.createElement('div');
      spinner.id = _uid;
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
      let spinner = document.getElementById(_uid);
      spinner.style.display = binding.value ? 'block' : 'none';
      // el.style.height = 'auto';
      // console.log( 'update' );
    },
    // 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。
    componentUpdated(){
      // console.log( 'componentUpdated' );
    },
    // 只调用一次，指令与元素解绑时调用。
    unbind(){
      // console.log( 'unbind' );
    }
  });
};
export default directive


