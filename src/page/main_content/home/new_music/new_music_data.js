
// 新歌速递header
export const express_header_tab_data = [
  {
    id: '0',
    name: '全部',
    path: '',
  },
  {
    id: '7',
    name: '华语',
    path: '',
  },
  {
    id: '96',
    name: '欧美',
    path: '',
  },
  {
    id: '16',
    name: '韩国',
    path: '',
  },
  {
    id: '8',
    name: '日本',
    path: '',
  },
];

// 新碟上架header
export const album_header_tab_data = [
  {
    id: 'ALL',
    name: '全部',
    path: '',
  },
  {
    id: 'ZH',
    name: '华语',
    path: '',
  },
  {
    id: 'EA',
    name: '欧美',
    path: '',
  },
  {
    id: 'KR',
    name: '韩国',
    path: '',
  },
  {
    id: 'JP',
    name: '日本',
    path: '',
  },
];

//新歌速递
export const new_music_data = {
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
        key: 'sort_num',
        width: 35,
        table_slot: 'sort_num'
      },
      {
        title: '',
        key: 'content',
        minWidth: 300,
        // tooltip: true,
        // ellipsis: true,
        table_slot: 'content'
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
        jpath: 'mvid'
      },
      {
        title: '别名',
        key: 'alias',
        noshow: true,
        jpath: 'alias'
      },
      {
        title: '音乐链接地址',
        key: 'mp3Url',
        noshow: true,
        jpath: 'mp3Url'
      },
      {
        title: '音乐封面',
        key: 'picUrl',
        noshow: true,
        jpath: 'album.picUrl'
      },
      {
        title: '歌名',
        key: 'song_name',
        noshow: true,
        jpath: 'name'
      },
      {
        title: '歌手',
        key: 'artists',
        noshow: false,
        minWidth: 90,
        jpath: 'artists',
        table_slot: 'artists'
      },
      {
        title: '专辑',
        key: 'album_name',
        noshow: false,
        minWidth: 150,
        maxWidth: 200,
        jpath: 'album',
        table_slot: 'album_name',
      },
      {
        title: '时长',
        key: 'duration',
        noshow: false,
        minWidth: 60,
        maxWidth: 80,
        jpath: 'duration'
      },
      {
        title: '最大码率',
        key: 'maxbr',
        noshow: true,
        jpath: 'privilege.maxbr'
      },
    ],
    t_body: [],
    /*t_body: [
      {
        id: '',
        song_name: '',
        maxbr: '',
        mvid: '',
        pic: '',
        singer: [],
        duration: '',
        album_name: '',
        alias: '',
        mp3Url: '',
        picUrl: '',
        artists: ''
      }
    ],*/
    t_page: {}
  },
};

//新碟上架
export const new_album_data = {
  id: '',
  name: '',
  type: 'album',
  weight: '0',//权值，排序优先度
  colsNum: 4,//列数
  expand: {
    play_icon: true
  },
  title: {
    name: '新碟上架',
    noshow: true,
    more_btn: '更多'
  },
  uiconfig: {
    id: 'id',
    picUrl: 'picUrl',
    name: 'name',
    artists: 'artists.0',
    alias: 'alias',
  },
  data: [
    /*{
      id: '',
      picUrl: '',
      name: '',
      artists: [],
      alias: []
    }*/
  ]
};
