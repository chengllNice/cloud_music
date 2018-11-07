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
    tracks: [],
    tags: [],
    table_data: {
      t_head: [
        {
          title: '歌曲排序',
          key: 'sort_num',
          width: 35,
          tooltip: true,
          table_slot: 'sort_num',
          // jpath: 'song.no'
        },
        {
          title: '操作',
          type: 'operate',
          key: 'operate',
        },
        {
          title: 'id',
          key: 'id',
          noshow: true,
          jpath: 'id'
        },
        {
          title: '标题',
          key: 'name',
          noshow: true,
          jpath: 'name'
        },
        {
          title: '歌手',
          key: 'artists',
          noshow: true,
          jpath: 'ar'
        },
        {
          title: '专辑',
          key: 'album',
          noshow: true,
          jpath: 'al'
        },
        {
          title: '时长',
          key: 'duration',
          jpath: 'dt'
        }
      ],
      t_body: [

      ]
    }
  }
};
