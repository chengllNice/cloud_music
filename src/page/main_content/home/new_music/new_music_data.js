
export const header_tab_data = [
  {
    id: 'all',
    name: '全部',
    path: '',
  },
  {
    id: 'china',
    name: '华语',
    path: '',
  },
  {
    id: 'west',
    name: '欧美',
    path: '',
  },
  {
    id: 'korea',
    name: '韩国',
    path: '',
  },
  {
    id: 'japan',
    name: '日本',
    path: '',
  },
];

//最新歌单
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
  /*data: {
    t_head: [
      [
        {
          title: '',
          key: 'test',
          noshow: true,
        },
        {
          title: '',
          key: 'sort_num',
          width: 35,
          tooltip: true,
          table_slot: 'sort_num'
        },
        {
          title: '',
          key: 'content',
          tooltip: true,
          table_slot: 'content'
        },
        /!*{
          title: '操作',
          key: 'operate',
          type: 'operate',
          tooltip: true,
          // width: ,
          align: 'center',
        }*!/
      ],
      [
        {
          title: '',
          key: 'sort_num',
          // type: 'index',
          width: 35,
          tooltip: true,
          // className: 'table_index',
          table_slot: 'sort_num'
        },
        {
          title: '',
          key: 'content',
          // width: 50,
          tooltip: true,
          table_slot: 'content'
        },
        /!*{
          title: '操作',
          key: 'operate',
          type: 'operate',
          tooltip: true,
          // width: ,
          align: 'center',
        }*!/
      ]
    ],
    t_body: [
      [
        {
          sort_num: '01',
          content: {
            id: '',
            img: 'http://p2.music.126.net/tt8xwK-ASC2iqXNUXYKoDQ==/109951163606377163.jpg?param=50y50&quality=100',
            song_name: '年少有为',
            songer: '李荣浩',
            des: '',
            video: false,
            superQuality: false,//超品质
          }
        },
        {
          sort_num: '02',
          content: {
            id: '',
            img: 'http://p1.music.126.net/tt8xwK-ASC2iqXNUXYKoDQ==/109951163606377163.jpg?param=130y130',
            song_name: '耳朵',
            songer: '李荣浩',
            des: '',
            video: true,
            superQuality: true,//超品质
          },
        },
        {
          sort_num: '03',
          content: {
            id: '',
            img: 'http://p2.music.126.net/tt8xwK-ASC2iqXNUXYKoDQ==/109951163606377163.jpg?param=50y50&quality=100',
            song_name: '年少有为',
            songer: '李荣浩',
            des: '',
            video: true,
            superQuality: true,//超品质
          }
        },
        {
          sort_num: '04',
          content: {
            id: '',
            img: 'http://p1.music.126.net/tt8xwK-ASC2iqXNUXYKoDQ==/109951163606377163.jpg?param=130y130',
            song_name: '耳朵',
            songer: '李荣浩',
            des: '',
            video: true,
            superQuality: true,//超品质
          }
        },
        {
          sort_num: '05',
          content: {
            id: '',
            img: 'http://p2.music.126.net/pBJOJF3y9cATRZAJ02Ju-w==/109951163611930628.jpg?param=130y130',
            song_name: '年少心事',
            songer: '王一博',
            des: '',
            video: true,
            superQuality: true,//超品质
          }
        },
      ],
      [
        {
          sort_num: '06',
          content: {
            id: '',
            img: 'http://p1.music.126.net/-qHPT3rhxDlu5zQV9NcQ-A==/109951163555860423.jpg?param=130y130',
            song_name: '盗将行',
            songer: '花粥,马雨阳',
            des: '',
            video: true,//是否有mv视频
            superQuality: true,//超品质
          }
        },
        {
          sort_num: '07',
          content: {
            id: '',
            img: 'http://p2.music.126.net/oov7j64hTKZSm0CEUkRNoQ==/109951163111639178.jpg?param=50y50&quality=100',
            song_name: '不染',
            songer: '毛不易',
            des: '电视剧《香蜜沉沉烬如霜》主题曲',
            video: true,
            superQuality: true,//超品质
          }
        },
        {
          sort_num: '08',
          content: {
            id: '',
            img: 'http://p2.music.126.net/WafK2OQfEtqXitdDXJ772Q==/109951163252847249.jpg?param=50y50&quality=100',
            song_name: '可不可以',
            songer: '张紫豪',
            des: '',
            video: true,
            superQuality: true,//超品质
          }
        },
        {
          sort_num: '09',
          content: {
            id: '',
            img: 'http://p1.music.126.net/DSTg1dR7yKsyGq4IK3NL8A==/109951163046050093.jpg?param=130y130',
            song_name: '云烟成雨',
            songer: '房东的猫',
            des: '动画《我是江小白》片尾曲',
            video: true,
            superQuality: true,//超品质
          }
        },
        {
          sort_num: '10',
          content: {
            id: '',
            img: 'http://p1.music.126.net/W9HqFsgMcjgWjW9SutIvrw==/18956679974613469.jpg?param=130y130',
            song_name: '魔鬼中的天使',
            songer: '田馥甄',
            des: '',
            video: false,
            superQuality: true,//超品质
          }
        }
      ]
    ],
    t_page: {}
  },*/
  data: {
      t_head: [
        {
          title: '',
          key: 'sort_num',
          width: 35,
          tooltip: true,
          table_slot: 'sort_num'
        },
        {
          title: '',
          key: 'content',
          tooltip: true,
          table_slot: 'content'
        },
        {
          title: '歌手',
          key: 'singer',
          width: 136,
          tooltip: true,
        },
        {
          title: '专辑',
          key: 'album',
          width: 180,
          tooltip: true,
          ellipsis: true,
        },
        {
          title: '时长',
          key: 'time',
          width: 60,
          tooltip: true,
        },
      ],
      t_body: [
        {
          id: '',
          song_name: '可不可以',
          singer: '张紫豪',
          album: '可不可以',
          time: '04:00',
          img: 'http://p1.music.126.net/DSTg1dR7yKsyGq4IK3NL8A==/109951163046050093.jpg?param=130y130',
          des: '动画《我是江小白》片尾曲',
          video: true,
          superQuality: true,//超品质
        },
        {
          id: '',
          song_name: '你要的全拿走',
          singer: '胡彦斌',
          album: '忒好',
          time: '04:59',
          img: 'http://p1.music.126.net/DSTg1dR7yKsyGq4IK3NL8A==/109951163046050093.jpg?param=130y130',
          des: '动画《我是江小白》片尾曲',
          video: true,
          superQuality: true,//超品质
        },
        {
          id: '',
          song_name: '就算我唱遍所有情歌',
          singer: '简弘亦',
          album: '就算我唱遍所有情歌',
          time: '04:20',
          img: 'http://p1.music.126.net/DSTg1dR7yKsyGq4IK3NL8A==/109951163046050093.jpg?param=130y130',
          des: '动画《我是江小白》片尾曲',
          video: true,
          superQuality: true,//超品质
        },
        {
          id: '',
          song_name: '你给我听好',
          singer: '陈奕迅',
          album: 'rice & shine',
          time: '04:48',
          img: 'http://p1.music.126.net/DSTg1dR7yKsyGq4IK3NL8A==/109951163046050093.jpg?param=130y130',
          des: '动画《我是江小白》片尾曲',
          video: true,
          superQuality: true,//超品质
        }
      ],
      t_page: {}
    },
};
