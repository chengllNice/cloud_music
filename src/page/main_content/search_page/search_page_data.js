import expandLrc from './search_songlrc/expand_lrc.vue'

export const search_tab_data = [
  {
    id: '1',
    name: '单曲',
    path: '/search_page/search_song',
    unit: '首单曲'
  },
  {
    id: '100',
    name: '歌手',
    path: '/search_page/search_singer',
    unit: '位歌手'
  },
  {
    id: '10',
    name: '专辑',
    path: '/search_page/search_album',
    unit: '张专辑'
  },
  {
    id: '1014',
    name: '视频',
    path: '/search_page/search_video',
    unit: '个视频'
  },
  {
    id: '1000',
    name: '歌单',
    path: '/search_page/search_songlist',
    unit: '个歌单'
  },
  {
    id: '1006',
    name: '歌词',
    path: '/search_page/search_songlrc',
    unit: '首歌词'
  },
  {
    id: '1009',
    name: '主播电台',
    path: '/search_page/search_dj',
    unit: '个电台'
  },
  {
    id: '1002',
    name: '用户',
    path: '/search_page/search_user',
    unit: '位用户'
  }
];

// 单曲
export const search_song_data = {
  id: '',
  name: '',
  type: 'table',
  weight: '1',//权值，排序优先度
  colsNum: 1,//列数
  slot: 'song_body',
  title: {
    name: '最新歌单',
    noshow: false,
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
        table_slot: 'sort_num'
      },
      {
        title: '操作',
        type: 'operate',
        key: 'operate',
        width: 60
      },
      {
        title: 'id',
        key: 'id',
        noshow: true,
        jpath: 'id'
      },
      {
        title: 'mvid',
        key: 'mvid',
        noshow: true,
        jpath: 'mv'
      },
      {
        title: '别名',
        key: 'alias',
        noshow: true,
        jpath: 'alia'
      },
      {
        title: '音乐标题',
        key: 'song_name',
        noshow: false,
        jpath: 'name',
        minWidth: 200,
        table_slot: 'song_name'
      },
      {
        title: '歌手',
        key: 'artists',
        noshow: false,
        minWidth: 90,
        jpath: 'ar',
        table_slot: 'artists'
      },
      {
        title: '专辑',
        key: 'album_name',
        noshow: false,
        minWidth: 150,
        maxWidth: 200,
        jpath: 'al',
        table_slot: 'album_name',
      },
      {
        title: '时长',
        key: 'duration',
        noshow: false,
        minWidth: 60,
        maxWidth: 80,
        jpath: 'dt'
      },
      {
        title: '最大码率',
        key: 'maxbr',
        noshow: true,
        jpath: 'privilege.maxbr'
      },
      {
        title: '热度',
        key: 'pop',
        noshow: false,
        width: 150,
        jpath: 'pop',
        table_slot: 'pop',
      },
    ],
    t_body: [],
    t_page: {
      page: 1,
      total: 0,
      pageSize: 100
    }
  },
};
// 歌手
export const search_singer_data = {
  id: '',
  name: '',
  type: 'table',
  weight: '1',//权值，排序优先度
  colsNum: 1,//列数
  slot: 'song_body',
  title: {
    name: '最新歌单',
    noshow: false,
    more_btn: '更多'
  },
  config: {
    colsNum: '1',
    showheader: false
  },
  data: {
    t_head: [
      {
        title: 'id',
        key: 'id',
        noshow: true,
        jpath: 'id'
      },
      {
        title: 'accountId',
        key: 'accountId',
        noshow: true,
        jpath: 'accountId'
      },
      {
        title: '别名',
        key: 'alias',
        noshow: true,
        jpath: 'alia'
      },
      {
        title: '歌手',
        key: 'name',
        noshow: false,
        jpath: 'name',
        table_slot: 'name'
      },
      {
        title: '歌手',
        key: 'picUrl',
        noshow: true,
        jpath: 'picUrl',
      },
    ],
    t_body: [],
    t_page: {
      page: 1,
      total: 0,
      pageSize: 20
    }
  },
};
// 专辑
export const search_album_data = {
  id: '',
  name: '',
  type: 'table',
  weight: '1',//权值，排序优先度
  colsNum: 1,//列数
  slot: 'song_body',
  title: {
    name: '最新歌单',
    noshow: false,
    more_btn: '更多'
  },
  config: {
    colsNum: '1',
    showheader: false
  },
  data: {
    t_head: [
      {
        title: 'id',
        key: 'id',
        noshow: true,
        jpath: 'id'
      },
      {
        title: 'picUrl',
        key: 'picUrl',
        noshow: false,
        width: 90,
        jpath: 'picUrl',
        table_slot: 'picUrl_content',
      },
      {
        title: 'name',
        key: 'name',
        noshow: false,
        jpath: 'name',
        table_slot: 'name_content'
      },
      {
        title: 'publishTime',
        key: 'publishTime',
        noshow: true,
        jpath: 'publishTime',
        table_slot: 'publishTime'
      },
      {
        title: 'artist',
        key: 'artist',
        noshow: false,
        jpath: 'artist',
        table_slot: 'artist'
      },
      {
        title: 'time',
        key: 'time',
        noshow: false,
        width: 180
      },
    ],
    t_body: [],
    t_page: {
      page: 1,
      total: 0,
      pageSize: 20
    }
  },
};
//视频
export const search_video_data = {
  id: '',
  name: '',
  type: 'mv',
  weight: '3',//权值，排序优先度
  colsNum: 4,//列数
  expand: {
    cover_top: true,
    drop_down: true,
    cover_bottom: true
  },
  title: {
    name: 'MV',
    noshow: true,
    more_btn: '更多'
  },
  uiconfig: {
    id: 'vid',
    video_type: 'type',
    name: 'title',
    picUrl: 'coverUrl',//封面
    playCount: 'playTime',//播放量
    artists: 'creator',//歌手组
    duration: 'durationms',//喜欢
  },
  data: [],
  page: {
    page: 1,
    pageSize: 20,
    total: 0
  }
};
// 歌单
export const search_songlist_data = {
  id: '',
  name: '',
  type: 'table',
  weight: '1',//权值，排序优先度
  colsNum: 1,//列数
  slot: 'song_body',
  title: {
    name: '最新歌单',
    noshow: false,
    more_btn: '更多'
  },
  config: {
    colsNum: '1',
    showheader: false
  },
  data: {
    t_head: [
      {
        title: 'id',
        key: 'id',
        noshow: true,
        jpath: 'id'
      },
      {
        title: 'picUrl',
        key: 'picUrl',
        noshow: true,
        jpath: 'coverImgUrl',
      },
      {
        title: 'name',
        key: 'name',
        noshow: false,
        minWidth: 260,
        jpath: 'name',
        table_slot: 'name_content'
      },
      {
        title: 'trackCount',
        key: 'trackCount',
        noshow: false,
        jpath: 'trackCount',
        table_slot: 'trackCount'
      },
      {
        title: 'creator',
        key: 'creator',
        noshow: false,
        jpath: 'creator',
        table_slot: 'creator'
      },
    ],
    t_body: [],
    t_page: {
      page: 1,
      total: 0,
      pageSize: 20
    }
  },
};
// 歌词
export const search_songlrc_data = {
  id: '',
  name: '',
  type: 'table',
  weight: '1',//权值，排序优先度
  colsNum: 1,//列数
  slot: 'song_body',
  title: {
    name: '最新歌单',
    noshow: false,
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
        table_slot: 'sort_num'
      },
      {
        title: '操作',
        type: 'operate',
        key: 'operate',
        width: 60
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
        minWidth: 150,
        jpath: 'name',
        table_slot: 'song_name'
      },
      {
        title: '歌手',
        key: 'artists',
        noshow: false,
        jpath: 'ar',
        table_slot: 'artists'
      },
      {
        title: '别名',
        key: 'alias',
        noshow: true,
        jpath: 'alia',
      },
      {
        title: '专辑',
        key: 'album_name',
        noshow: false,
        jpath: 'al',
        table_slot: 'album_name'
      },
      {
        title: '时长',
        key: 'duration',
        noshow: false,
        minWidth: 60,
        maxWidth: 80,
        jpath: 'dt'
      },
      {
        title: '热度',
        key: 'pop',
        width: 150,
        noshow: false,
        jpath: 'pop',
        table_slot: 'pop'
      },
      {
        title: 'lyrics',
        key: 'lyrics',
        noshow: true,
        jpath: 'lyrics',
      },
      {
        title: '最大码率',
        key: 'maxbr',
        noshow: true,
        jpath: 'privilege.maxbr'
      },
      {
        type:'expand',
        width: 40,
        render: (h, params) => {
          return h(expandLrc, {
            props: {
              row: params.row
            }
          })
        }
      },
    ],
    t_body: [],
    t_page: {
      page: 1,
      total: 0,
      pageSize: 20
    }
  },
};
// 电台
export const search_dj_data = {
  id: '',
  name: '',
  type: 'album',
  weight: '3',//权值，排序优先度
  colsNum: 5,//列数
  expand: {
    cover_top: false,
    drop_down: false,
    cover_bottom: false
  },
  title: {
    name: '主播电台',
    noshow: true,
    more_btn: '更多'
  },
  uiconfig: {
    id: 'id',
    name: 'name',
    picUrl: 'picUrl',//封面
    artists: 'dj.nickname',
  },
  data: [],
  page: {
    page: 1,
    pageSize: 20,
    total: 0
  }
};
// 用户
export const search_user_data = {
  id: '',
  name: '',
  type: 'table',
  weight: '1',//权值，排序优先度
  colsNum: 1,//列数
  slot: 'song_body',
  title: {
    name: '最新歌单',
    noshow: false,
    more_btn: '更多'
  },
  config: {
    colsNum: '1',
    showheader: false
  },
  data: {
    t_head: [
      {
        title: 'id',
        key: 'id',
        noshow: true,
        jpath: 'userId'
      },
      {
        title: '用户名',
        key: 'name',
        noshow: false,
        jpath: 'nickname',
        table_slot: 'name'
      },
      {
        title: '头像',
        key: 'avatarUrl',
        noshow: true,
        jpath: 'avatarUrl',
      },
      {
        title: '性别',
        key: 'gender',
        noshow: true,
        jpath: 'gender',
      },
      {
        title: '签名',
        key: 'signature',
        noshow: true,
        jpath: 'signature',
      },
    ],
    t_body: [],
    t_page: {
      page: 1,
      total: 0,
      pageSize: 20
    }
  },
};
