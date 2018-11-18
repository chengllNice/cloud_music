
//播放列表
export const playlist_data = {
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
