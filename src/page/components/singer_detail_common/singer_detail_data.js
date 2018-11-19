

//专辑---theme
export const singer_album_theme_data = {
  id: '',
  name: '',
  type: 'album',
  weight: '0',//权值，排序优先度
  colsNum: 4,//列数
  expand: {
    play_icon: true
  },
  title: {
    name: '歌手专辑',
    noshow: true,
    more_btn: '更多'
  },
  uiconfig: {
    id: 'id',
    picUrl: 'picUrl',
    name: 'name',
    publishTime: 'publishTime',
    alias: 'alias',
    size: 'size'
  },
  data: []
};

// 专辑---list
export const singer_album_list_data = {
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
        title: 'name',
        key: 'name',
        noshow: true,
        jpath: 'name',
        table_slot: 'name'
      },
      {
        title: 'publishTime',
        key: 'publishTime',
        noshow: true,
        jpath: 'publishTime',
        table_slot: 'publishTime'
      },
      {
        title: 'picUrl',
        key: 'picUrl',
        noshow: true,
        jpath: 'picUrl',
      },
      {
        title: 'alias',
        key: 'alias',
        noshow: true,
        jpath: 'alias'
      },
      {
        title: 'picUrl_content',
        key: 'picUrl_content',
        noshow: false,
        table_slot: 'picUrl_content',
        width: 90
      },
      {
        title: 'name_content',
        key: 'name_content',
        noshow: false,
        table_slot: 'name_content'
      },
      {
        title: 'size',
        key: 'size',
        noshow: false,
        jpath: 'size',
        maxWidth: 200
      },
      {
        title: 'time',
        key: 'time',
        noshow: false,
        width: 180
      },
    ],
    t_body: [],
    t_page: {}
  },
};

// 专辑---theme_list
export const singer_album_theme_list_data = {
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
    showheader: false
  },
  data: {
    t_head: [
      {
        title: '',
        key: 'sort_num',
        width: 30,
        tooltip: true,
        table_slot: 'sort_num',
        // jpath: 'song.no'
      },
      {
        title: '操作',
        type: 'operate',
        key: 'operate',
        width: 50
      },
      {
        title: 'id',
        key: 'id',
        noshow: true,
        jpath: 'id'
      },
      {
        title: 'name',
        key: 'name',
        noshow: true,
        jpath: 'name',
      },
      {
        title: 'picUrl',
        key: 'picUrl',
        noshow: true,
        jpath: 'al.picUrl'
      },
      {
        title: 'artists',
        key: 'artists',
        noshow: true,
        jpath: 'ar'
      },
      {
        title: 'album_name',
        key: 'album_name',
        noshow: true,
        jpath: 'al.name'
      },
      {
        title: 'alias',
        key: 'alias',
        noshow: true,
        jpath: 'al'
      },
      {
        title: 'maxbr',
        key: 'maxbr',
        noshow: true,
        jpath: 'privilege.maxbr'
      },
      {
        title: 'mv',
        key: 'mv',
        noshow: true,
        jpath: 'mv'
      },
      {
        title: 'name_content',
        key: 'name_content',
        table_slot: 'name_content'
      },
      {
        title: 'duration',
        key: 'duration',
        jpath: 'dt'
      },
    ],
    t_body: [],
    t_page: {}
  },
};

//mv
export const singer_mv_data = {
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
    id: 'id',
    name: 'name',
    picUrl: 'imgurl16v9',//封面
    playCount: 'playCount',//播放量
    artists: 'artists',//歌手组
    duration: 'duration',//喜欢
  },
  data: []
};
