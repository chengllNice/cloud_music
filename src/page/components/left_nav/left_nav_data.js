export const left_nav_data = [
  {
    id: '0',
    noshow: false,
    title: {
      name: '推荐',
      new_item_btn: false,
      down_btn: false
    },
    data: [
      {
        id: 'find_music',
        noshow: false,
        icon: {
          name: 'icon-left_music2',
          fontSize: '20px',
          fontWeight: '400'
        },
        name: '发现音乐',
        path: '/home/home_recommend',
      },
      {
        id: 'private_FM',
        noshow: false,
        icon: {
          name: 'icon-left_radio',
          fontSize: '18px',
          fontWeight: '400'
        },
        name: '私人FM',
        path: '',
      },
      {
        id: 'video',
        noshow: false,
        icon: {
          name: 'icon-left_video',
          fontSize: '17px',
          fontWeight: 'bolder'
        },
        name: '视频',
        path: '/video/video',
      },
      {
        id: 'friend',
        noshow: false,
        icon: {
          name: 'icon-left_friend1',
          fontSize: '18px',
          fontWeight: '400'
        },
        name: '朋友',
        path: '',
      }
    ]
  },
  {
    id: '1',
    noshow: false,
    title: {
      name: '我的音乐',
      new_item_btn: false,
      down_btn: false
    },
    data: [
      {
        id: 'local_music',
        noshow: false,
        icon: {
          name: 'icon-left_local_music1',
          fontSize: '17px',
          fontWeight: 'bolder'
        },
        // icon: 'icon-left_local_music',
        name: '本地音乐',
        path: '',
      },
      {
        id: 'down_manage',
        noshow: false,
        icon: {
          name: 'icon-left_down',
          fontSize: '17px',
          fontWeight: '100'
        },
        // icon: 'icon-left_down',
        name: '下载管理',
        path: '',
      },
      {
        id: 'cloud',
        noshow: false,
        icon: {
          name: 'icon-left_cloud',
          fontSize: '18px',
          fontWeight: '600'
        },
        // icon: 'icon-left_cloud',
        name: '我的音乐云盘',
        path: '',
      },
      {
        id: 'collections',
        noshow: false,
        icon: {
          name: 'icon-left_collection',
          fontSize: '18px',
          fontWeight: '600'
        },
        // icon: 'icon-left_collection',
        name: '我的收藏',
        path: '',
      }
    ]
  },
  {
    id: '2',
    noshow: false,
    title: {
      name: '创建的歌单',
      new_item_btn: true,
      down_btn: true
    },
    data: [
      {
        id: 'like_music',
        noshow: false,
        icon: {
          name: 'icon-left_like',
          fontSize: '18px',
          fontWeight: '600'
        },
        // icon: 'icon-left_like',
        name: '我喜欢的音乐',
        path: '',
      },
      {
        id: 'my_music',
        noshow: false,
        icon: {
          name: 'icon-left_music_list',
          fontSize: '17px',
          fontWeight: '400'
        },
        // icon: 'icon-left_music_list',
        name: '我的音乐',
        path: '',
      }
    ]
  },
  {
    id: '3',
    noshow: false,
    title: {
      name: '收藏的歌单',
      new_item_btn: false,
      down_btn: true
    },
    data: []
  }
];

export const music_info_data = {

};
