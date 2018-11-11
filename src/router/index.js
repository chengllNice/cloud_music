import Vue from 'vue'
import Router from 'vue-router'

import home from './home_router'
import common from './common_router'
Vue.use(Router)

export default new Router({
  routes: [
    home,
    common,
  ]
})
