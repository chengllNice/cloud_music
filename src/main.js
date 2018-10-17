// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

//自定义组件库
import toolComponents from './components/tool_components/index.js'
//自定义全局方法库
import toolFunction from './assets/js/toolFunction.js'
//基础css
import './assets/css/main_base.less'
import '../static/iconfont/iconfont.css'

Vue.use(iView);
Vue.use(toolComponents);
Vue.use(toolFunction);

Vue.config.productionTip = false;

/* eslint-disable no-new */
const mainVue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

global.Vue = mainVue;

export default mainVue;
