import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const state = {
  // 用户信息
  user_info: {
    name: '',
    id: '',
    avatarUrl: "",
    backgroundUrl: "",
    defaultAvatar: true,
    description: "",
    detailDescription: "",
  },
  music_info: {
  // 正在播放的歌曲信息
    id: '505632651',
    url: '../../../static/music/3.mp3',
    picUrl: '../../../static/img/test/music_cover.jpg',
    song_name: '崇拜',
    album: {},//专辑名
    alias: ['林俊杰'],//别名，来源
    playStatus: 'pause',//play正在播放 pause暂停
    artists: ['林俊杰'],//歌手
    like: '',
    maxbr: '320000',//频率，音质
    currentTime: '',//当前播放时间
    duration: '',//音乐总时长
    volume: '',//音量
    loop: '',//循环方式
  },
  // 播放列表
  music_list: [
    {}
  ],

  device_info: {},
  scroll_info: {},//滚动条相关信息,
  lrc_panal_show: false,//歌词面板控制
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
