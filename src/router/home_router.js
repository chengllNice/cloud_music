
const main_content = () => import('../page/main_content/main_content');

const home = r => require.ensure([], () => r(require('../page/main_content/home/home')), 'home');
const home_recommend = r => require.ensure([], () => r(require('../page/main_content/home/home_recommend/home_recommend')), 'home_recommend');
const playlist = r => require.ensure([], () => r(require('../page/main_content/home/playlist/playlist')), 'playlist');
const dj_radio = r => require.ensure([], () => r(require('../page/main_content/home/dj_radio/dj_radio')), 'dj_radio');
const top_list = r => require.ensure([], () => r(require('../page/main_content/home/top_list/top_list')), 'top_list');
const songer_list = r => require.ensure([], () => r(require('../page/main_content/home/songer_list/songer_list')), 'songer_list');
const new_music = r => require.ensure([], () => r(require('../page/main_content/home/new_music/new_music')), 'new_music');

export default {
  path: '/',
  component: main_content,
  redirect: '/home',
  children: [
    {
      path: '/home',
      component: home,
      redirect: '/home/home_recommend',
      children: [
        {
          path: '/home/home_recommend',
          component: home_recommend,
        },
        {
          path: '/home/playlist',
          component: playlist,
        },
        {
          path: '/home/dj_radio',
          component: dj_radio,
        },
        {
          path: '/home/top_list',
          component: top_list,
        },
        {
          path: '/home/songer_list',
          component: songer_list,
        },
        {
          path: '/home/new_music',
          component: new_music,
        }
      ]
    }
  ]
}
