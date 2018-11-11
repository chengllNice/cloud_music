
// 语种
export const songer_cat_language = {
  name: '语种',
  data: [
    {
      id: '10',
      type: 'language',
      name: '全部'
    },
    {
      id: '10',
      type: 'language',
      name: '华语'
    },
    {
      id: '20',
      type: 'language',
      name: '欧美'
    },
    {
      id: '60',
      type: 'language',
      name: '日本'
    },
    {
      id: '70',
      type: 'language',
      name: '韩国'
    },
    {
      id: '40',
      type: 'language',
      name: '其他'
    }
  ]
};

// 分类
export const songer_cat_sub = {
  name: '分类',
  data: [
    {
      id: '01',
      type: 'sub',
      name: '全部'
    },
    {
      id: '01',
      type: 'sub',
      name: '男歌手'
    },
    {
      id: '02',
      type: 'sub',
      name: '女歌手'
    },
    {
      id: '03',
      type: 'sub',
      name: '乐队组合'
    }
  ]
};

// 筛选
export const songer_cat_select = {
  name: '筛选',
  data: [
    {
      id: 'hot',
      type: 'select',
      name: '热门'
    },
    {
      id: 'a',
      type: 'select',
      name: 'A'
    },
    {
      id: 'b',
      type: 'select',
      name: 'B'
    },
    {
      id: 'c',
      type: 'select',
      name: 'C'
    },
    {
      id: 'd',
      type: 'select',
      name: 'D'
    },
    {
      id: 'e',
      type: 'select',
      name: 'E'
    },
    {
      id: 'f',
      type: 'select',
      name: 'F'
    },
    {
      id: 'g',
      type: 'select',
      name: 'G'
    },
    {
      id: 'h',
      type: 'select',
      name: 'H'
    },
    {
      id: 'i',
      type: 'select',
      name: 'I'
    },
    {
      id: 'j',
      type: 'select',
      name: 'J'
    },
    {
      id: 'k',
      type: 'select',
      name: 'K'
    },
    {
      id: 'l',
      type: 'select',
      name: 'L'
    },
    {
      id: 'm',
      type: 'select',
      name: 'M'
    },
    {
      id: 'n',
      type: 'select',
      name: 'N'
    },
    {
      id: 'o',
      type: 'select',
      name: 'O'
    },
    {
      id: 'p',
      type: 'select',
      name: 'P'
    },
    {
      id: 'q',
      type: 'select',
      name: 'Q'
    },
    {
      id: 'r',
      type: 'select',
      name: 'R'
    },
    {
      id: 's',
      type: 'select',
      name: 'S'
    },
    {
      id: 't',
      type: 'select',
      name: 'T'
    },
    {
      id: 'u',
      type: 'select',
      name: 'U'
    },
    {
      id: 'v',
      type: 'select',
      name: 'V'
    },
    {
      id: 'w',
      type: 'select',
      name: 'W'
    },
    {
      id: 'x',
      type: 'select',
      name: 'X'
    },
    {
      id: 'y',
      type: 'select',
      name: 'Y'
    },
    {
      id: 'z',
      type: 'select',
      name: 'Z'
    },
    {
      id: '',
      type: 'select',
      name: '#'
    }
  ]
};

// 歌手列表
export const songer_data = {
  id: '',
  name: '',
  type: '',
  weight: '0',//权值，排序优先度
  colsNum: 5,//列数
  expand: {
    cover_top: false,
    drop_down: false,
    play_icon: false,
    cover_bottom: false,//底部覆盖
  },
  title: {
    name: '歌手',
    noshow: true,
    more_btn: '更多'
  },
  uiconfig: {
    id: 'id',
    name: 'name',
    picUrl: 'img1v1Url',
    accountId: 'accountId',
  },
  data: []
};
