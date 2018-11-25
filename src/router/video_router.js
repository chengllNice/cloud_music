
const main_content = () => import('../page/main_content/main_content');
const main_content_view = () => import('../page/main_content/main_content_view');

const video = r => require.ensure([], () => r(require('../page/main_content/video/video')), 'video');
// 视频
const video_video = r => require.ensure([], () => r(require('../page/main_content/video/video_video/video_video')), 'video_video');
// MV
const video_mv = r => require.ensure([], () => r(require('../page/main_content/video/video_mv/video_mv')), 'video_mv');

export default {
  path: '/',
  component: main_content,
  redirect: '/main',
  children: [
    {
      path: '/main',
      component: main_content_view,
      redirect: '/video',
      children: [
        {
          path: '/video',
          component: video,
          redirect: '/video/video',
          children: [
            {
              path: '/video/video',
              name: 'video_video',
              component: video_video,
            },
            {
              path: '/video/mv',
              name: 'video_mv',
              component: video_mv,
            },
          ]
        },
      ]
    }
  ]
}
