import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const state = {
  music_info: {
  // 正在播放的歌曲信息
    id: '1',
    url: '../../../../static/music/1.mp3',
    picUrl: '../../../static/img/test/music_cover.jpg',
    song_name: '崇拜',
    playStatus: 'pause',//play正在播放 pause暂停
    artists: [],
    like: '',
    crrentTime: '',//当前播放时间
    duration: '',//音乐总时长
    volume: '',//音量
    loop: '',//循环方式
  },
  device_info: {},
  scroll_info: {},//滚动条相关信息
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
