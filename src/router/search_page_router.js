
const main_content = () => import('../page/main_content/main_content');
const main_content_view = () => import('../page/main_content/main_content_view');

const search_page = r => require.ensure([], () => r(require('../page/main_content/search_page/search_page')), 'search_page');
const search_song = r => require.ensure([], () => r(require('../page/main_content/search_page/search_song/search_song')), 'search_song');
const search_singer = r => require.ensure([], () => r(require('../page/main_content/search_page/search_singer/search_singer')), 'search_singer');
const search_album = r => require.ensure([], () => r(require('../page/main_content/search_page/search_album/search_album')), 'search_album');
const search_songlist = r => require.ensure([], () => r(require('../page/main_content/search_page/search_songlist/search_songlist')), 'search_songlist');
const search_dj = r => require.ensure([], () => r(require('../page/main_content/search_page/search_dj/search_dj')), 'search_dj');
const search_user = r => require.ensure([], () => r(require('../page/main_content/search_page/search_user/search_user')), 'search_user');
const search_songlrc = r => require.ensure([], () => r(require('../page/main_content/search_page/search_songlrc/search_songlrc')), 'search_songlrc');
const search_video = r => require.ensure([], () => r(require('../page/main_content/search_page/search_video/search_video')), 'search_video');

export default {
  path: '/',
  component: main_content,
  redirect: '/main',
  children: [
    {
      path: '/main',
      component: main_content_view,
      redirect: '/search_page',
      children: [
        {
          path: '/search_page',
          name: 'search_page',
          component: search_page,
          children: [
            {
              path: '/search_page/search_song',
              component: search_song
            },
            {
              path: '/search_page/search_singer',
              component: search_singer
            },
            {
              path: '/search_page/search_album',
              component: search_album
            },
            {
              path: '/search_page/search_songlist',
              component: search_songlist
            },
            {
              path: '/search_page/search_songlrc',
              component: search_songlrc
            },
            {
              path: '/search_page/search_dj',
              component: search_dj
            },
            {
              path: '/search_page/search_user',
              component: search_user
            },
            {
              path: '/search_page/search_video',
              component: search_video
            }
          ]
        }
      ]
    }
  ]
}
