

//飙升榜
export const up_music_list_data = {
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
        title: '歌曲排序',
        key: 'sort_num_custom',
        width: 25,
        // jpath:'sort_num_custom',
        table_slot: 'sort_num_custom'
      },
      {
        title: 'trackIds',
        key: 'trackIds',
        noshow: false,
        width: 40,
        jpath: 'trackIds',
        table_slot: 'trackIds'
      },
      {
        title: 'id',
        key: 'id',
        noshow: true,
        jpath: 'id'
      },
      {
        title: 'album_name',
        key: 'album_name',
        noshow: true,
        jpath: 'al'
      },
      {
        title: '别名',
        key: 'alias',
        noshow: true,
        jpath: 'alia'
      },
      {
        title: '音乐封面',
        key: 'picUrl',
        noshow: true,
        jpath: 'al.picUrl'
      },
      {
        title: '歌名',
        key: 'song_name',
        noshow: false,
        jpath: 'name',
        table_slot: 'song_name'
      },
      {
        title: '歌手',
        key: 'artists',
        noshow: false,
        width: 80,
        jpath: 'ar',
        table_slot: 'artists'
      },
    ],
    t_body: [],
    t_page: {}
  },
};

// 新歌榜，热歌榜，原创榜，
export const music_list_data = {
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
        title: '歌曲排序',
        key: 'sort_num_custom',
        width: 25,
        // jpath:'sort_num_custom',
        table_slot: 'sort_num_custom'
      },
      {
        title: 'lastRank',
        key: 'lastRank',
        noshow: false,
        width: 30,
        jpath: 'trackIds',
        table_slot: 'lastRank'
      },
      {
        title: 'id',
        key: 'id',
        noshow: true,
        jpath: 'id'
      },
      {
        title: 'album_name',
        key: 'album_name',
        noshow: true,
        jpath: 'al'
      },
      {
        title: '别名',
        key: 'alias',
        noshow: true,
        jpath: 'alia'
      },
      {
        title: '音乐封面',
        key: 'picUrl',
        noshow: true,
        jpath: 'al.picUrl'
      },
      {
        title: '歌名',
        key: 'song_name',
        noshow: false,
        jpath: 'name',
        table_slot: 'song_name'
      },
      {
        title: '歌手',
        key: 'artists',
        noshow: false,
        width: 80,
        jpath: 'ar',
        table_slot: 'artists'
      },
    ],
    t_body: [],
    t_page: {}
  },
};

// 歌手榜
export const singer_list_data = {
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
        title: '歌曲排序',
        key: 'sort_num_custom',
        width: 25,
        // jpath:'sort_num_custom',
        table_slot: 'sort_num_custom'
      },
      {
        title: 'id',
        key: 'id',
        noshow: true,
        jpath: 'id'
      },
      {
        title: 'lastRank',
        key: 'lastRank',
        noshow: false,
        width: 30,
        jpath: 'lastRank',
        table_slot: 'lastRank'
      },
      {
        title: '歌手',
        key: 'name',
        noshow: false,
        toopTip: true,
        jpath: 'name',
      },
    ],
    t_body: [],
    t_page: {}
  },
};

//全球榜
export const whole_world_list_data = {
  id: '',
  name: '',
  type: '',
  weight: '0',//权值，排序优先度
  colsNum: 5,//列数
  expand: {
    cover_top: true,
    drop_down: true,
    play_icon: true
  },
  title: {
    name: '推荐歌单',
    noshow: true,
    more_btn: '更多'
  },
  uiconfig: {
    id: 'id',
    name: 'name',
    playCount: 'playCount',
    picUrl: 'coverImgUrl',
  },
  data: []
};

