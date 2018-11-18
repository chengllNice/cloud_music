
const main_content = () => import('../page/main_content/main_content');

// // 歌单详情
// const songlist_detail_common = r => require.ensure([], () => r(require('../page/main_content/songlist_detail_common/songlist_detail_common')), 'songlist_detail_common');
// // 歌手详情
// const singer_detail_common = r => require.ensure([], () => r(require('../page/components/singer_detail_common/singer_detail_common')), 'singer_detail_common');
// mv播放
const play_mv = r => require.ensure([], () => r(require('../page/components/play_mv/play_mv')), 'play_mv');



export default {
  path: '/',
  component: main_content,
  children: [
    // {
    //   path: '/songlist_detail_common',
    //   name: 'songlist_detail_common',
    //   component: songlist_detail_common,
    // },
    // {
    //   path: '/singer_detail_common',
    //   name: 'singer_detail_common',
    //   component: singer_detail_common,
    // },
    {
      path: '/play_mv',
      name: 'play_mv',
      component: play_mv,
    }
  ]
}
