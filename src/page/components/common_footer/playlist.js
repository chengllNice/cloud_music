
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
        title: '播放状态',
        key: 'playStatus',
        noshow: false,
        width: 20,
        table_slot: 'playStatus'
      },
      {
        title: 'id',
        key: 'id',
        noshow: true,
        // jpath: 'id'
      },
      {
        title: 'mvid',
        key: 'mvid',
        noshow: true,
        // jpath: 'mv'
      },
      {
        title: '别名',
        key: 'alias',
        noshow: true,
        // jpath: 'alia'
      },
      {
        title: '歌名',
        key: 'song_name',
        noshow: false,
        // jpath: 'name',
        table_slot: 'song_name'
      },
      {
        title: '歌手',
        key: 'artists',
        noshow: false,
        width: 120,
        // jpath: 'ar',
        table_slot: 'artists'
      },
      {
        title: '来源',
        key: 'source_path',
        noshow: false,
        width: 30,
        table_slot: 'source_path'
      },
      {
        title: '时长',
        key: 'duration',
        noshow: false,
        width: 55,
        // jpath: 'dt'
      },
      {
        title: '最大码率',
        key: 'maxbr',
        noshow: true,
        // jpath: 'privilege.maxbr'
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
