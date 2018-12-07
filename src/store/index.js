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
    id: '',
    url: '',
    picUrl: '',
    song_name: '',
    album: {},//专辑名
    alias: [],//别名，来源
    playStatus: 'pause',//play正在播放 pause暂停
    artists: [],//歌手
    like: '',
    maxbr: '',//频率，音质
    currentTime: '',//当前播放时间
    duration: '',//音乐总时长
    volume: '',//音量
    loop: '',//循环方式
    source_path: {path: '',id: ''},//path音乐播放来源地址路由  音乐来源id--->专辑id或者歌单id
    data: {},//原始数据
  },
  // 播放列表id
  play_music_list: {
    data: [],
  },
  // 播放历史
  history_music_list: {
    data: []
  },

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
