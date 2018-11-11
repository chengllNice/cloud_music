

//专辑---theme
export const singer_album_data = {
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
        width: 50
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
