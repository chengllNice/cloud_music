export const songlist_data = {
  uiconfig: {
    name: 'playlist.name',
    playCount: 'playlist.playCount',
    trackCount: 'playlist.trackCount',
    description: 'playlist.description',
    coverImgUrl: 'playlist.coverImgUrl',
    createTime: 'playlist.createTime',
    creator: 'playlist.creator',
    shareCount: 'playlist.shareCount',
    subscribedCount: 'playlist.subscribedCount',
    subscribers: 'playlist.subscribers',
    tracks: 'playlist.tracks',
    tags: 'playlist.tags',
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
    table_data: {
      t_head: [
        {
          title: '',
          key: 'sort_num',
          width: 45,
          tooltip: true,
          table_slot: 'sort_num',
          // jpath: 'song.no'
        },
        {
          title: '',
          key: 'lastRank',
          noshow: true,
          width: 30,
          jpath: 'lastRank',
          table_slot: 'lastRank'
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
          minWidth: 270,
          table_slot: 'song_name'
        },
        {
          title: '飙升率',
          key: 'trackIds',
          noshow: true,
          jpath: 'trackIds',
          minWidth: 55,
          table_slot: 'trackIds'
        },
        {
          title: '歌手',
          key: 'artists',
          noshow: false,
          jpath: 'ar',
          minWidth: 185,
          table_slot: 'artists'
        },
        {
          title: '专辑',
          key: 'album_name',
          noshow: false,
          jpath: 'al',
          minWidth: 170,
          table_slot: 'album'
        },
        {
          title: '时长',
          key: 'duration',
          jpath: 'dt',
          width: 80
        }
      ],
      t_body: [

      ]
    }
  }
};
