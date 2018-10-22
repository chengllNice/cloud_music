import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const state = {
  // 正在播放的歌曲信息
  music_info_data: {
    id: '1',
    img: '../../../static/img/test/music_cover.jpg',
    name: '云烟成雨',
    sing_name: '房东家的猫',
    like: '',
  },
  device_info: {}
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
