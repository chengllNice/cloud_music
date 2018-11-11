
//歌单
export const playlist_data = {
  id: '',
  name: '',
  type: '',
  weight: '0',//权值，排序优先度
  colsNum: 4,//列数
  expand: {
    cover_top: true,
    drop_down: false,
    play_icon: true,
    cover_bottom: true,//底部覆盖
  },
  title: {
    name: '歌单',
    noshow: true,
    more_btn: '更多'
  },
  uiconfig: {
    id: 'id',
    type: 'type',
    alg: 'alg',
    canDislike: 'canDislike',
    highQuality: 'highQuality',
    name: 'name',
    copywriter: 'copywriter',
    picUrl: 'coverImgUrl',
    playCount: 'playCount',
    trackCount: 'trackCount',
    nickname: 'creator.nickname',
    userType: 'creator.userType',
    vipType: 'creator.vipType',
  },
  page: {
    total: 0,
    page: 1,
    pageSize: 100
  },
  data: []
};



