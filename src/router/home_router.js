
const main_content = () => import('../page/main_content/main_content');
const main_content_view = () => import('../page/main_content/main_content_view');

const home = r => require.ensure([], () => r(require('../page/main_content/home/home')), 'home');
const home_recommend = r => require.ensure([], () => r(require('../page/main_content/home/home_recommend/home_recommend')), 'home_recommend');
const playlist = r => require.ensure([], () => r(require('../page/main_content/home/playlist/playlist')), 'playlist');
const dj_radio = r => require.ensure([], () => r(require('../page/main_content/home/dj_radio/dj_radio')), 'dj_radio');
const top_list = r => require.ensure([], () => r(require('../page/main_content/home/top_list/top_list')), 'top_list');
const singer_list = r => require.ensure([], () => r(require('../page/main_content/home/singer_list/singer_list')), 'singer_list');

// 最新音乐
const new_music = r => require.ensure([], () => r(require('../page/main_content/home/new_music/new_music')), 'new_music');
const new_music_express = r => require.ensure([], () => r(require('../page/main_content/home/new_music/new_music_express')), 'new_music_express');
const new_music_album = r => require.ensure([], () => r(require('../page/main_content/home/new_music/new_music_album')), 'new_music_album');

// 歌单详情
const songlist_detail_common = r => require.ensure([], () => r(require('../page/main_content/songlist_detail_common/songlist_detail_common')), 'songlist_detail_common');
// 专辑详情
const album_detail_common = r => require.ensure([], () => r(require('../page/components/album_detail_common/album_detail_common')), 'album_detail_common');
// 歌手详情
const singer_detail_common = r => require.ensure([], () => r(require('../page/components/singer_detail_common/singer_detail_common')), 'singer_detail_common');

export default {
  path: '/',
  component: main_content,
  redirect: '/main',
  children: [
    {
      path: '/main',
      component: main_content_view,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: home,
          redirect: '/home/home_recommend',
          children: [
            {
              path: '/home/home_recommend',
              name: 'home_recommend',
              component: home_recommend,
            },
            {
              path: '/home/playlist',
              name: 'playlist',
              component: playlist,
            },
            {
              path: '/home/dj_radio',
              name: 'dj_radio',
              component: dj_radio,
            },
            {
              path: '/home/top_list',
              name: 'top_list',
              component: top_list,
            },
            {
              path: '/home/singer_list',
              name: 'singer_list',
              component: singer_list,
            },
            {
              path: '/home/new_music',
              name: 'new_music',
              redirect: '/home/new_music/express',
              component: new_music,
              children: [
                {
                  path: '/home/new_music/express',
                  name: 'new_music_express',
                  component: new_music_express,
                },
                {
                  path: '/home/new_music/album',
                  name: 'new_music_album',
                  component: new_music_album,
                },
              ]
            }
          ]
        },
        {
          path: '/songlist_detail_common',
          name: 'songlist_detail_common',
          component: songlist_detail_common,
        },
        {
          path: '/album_detail_common',
          name: 'album_detail_common',
          component: album_detail_common,
        },
        {
          path: '/singer_detail_common',
          name: 'singer_detail_common',
          component: singer_detail_common,
        },
      ]
    }
  ]
}
