export const album_data = {
  uiconfig: {
    name: 'name',
    playCount: 'playCount',
    trackCount: 'trackCount',
    description: 'description',
    coverImgUrl: 'coverImgUrl',
    createTime: 'createTime',
    creator: 'creator',
    shareCount: 'shareCount',
    subscribedCount: 'subscribedCount',
    subscribers: 'subscribers',
    tracks: 'tracks',
    tags: 'tags',
  },
  data: {
    name: '',
    playCount: '',
    trackCount: '',
    description: '',
    coverImgUrl: '',
    createTime: '',
    creator: {},
    shareCount: '',
    subscribedCount: '',
    subscribers: [],
    tracks: [],
    tags: [],
  }
};

export const album_song_data = {
  id: '',
  name: '',
  type: 'table',
  weight: '1',//权值，排序优先度
  colsNum: 1,//列数
  // slot: 'song_body',
  title: {
    name: '最新歌单',
    noshow: true,
    more_btn: '更多'
  },
  config: {
    colsNum: '1',
    showheader: true
  },
  data: {
    t_head: [
      {
        title: '',
        key: 'sort_num',
        width: 45,
        table_slot: 'sort_num',
      },
      {
        title: '操作',
        type: 'operate',
        key: 'operate',
        width: 60
      },
      {
        title: '别名',
        key: 'alias',
        noshow: true,
        jpath: 'alia'
      },
      {
        title: '封面',
        key: 'picUrl',
        noshow: true,
        jpath: 'al.picUrl'
      },
      {
        title: 'id',
        key: 'id',
        noshow: true,
        jpath: 'id'
      },
      {
        title: '音乐标题',
        key: 'song_name',
        noshow: false,
        jpath: 'name',
        minWidth: 240,
        table_slot: 'song_name'
      },
      {
        title: '歌手',
        key: 'artists',
        noshow: false,
        jpath: 'ar',
        minWidth: 120,
        table_slot: 'artists'
      },
      {
        title: '专辑',
        key: 'album_name',
        noshow: false,
        jpath: 'al',
        minWidth: 150,
        table_slot: 'album'
      },
      {
        title: '时长',
        key: 'duration',
        jpath: 'dt',
        width: 80
      },
      {
        title: '热度',
        key: 'pop',
        jpath: 'pop',
        width: 150,
        table_slot: 'pop'
      }
    ],
    t_body: [],
    t_page: {}
  },
};
