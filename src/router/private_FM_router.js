
const main_content = () => import('../page/main_content/main_content');
const main_content_view = () => import('../page/main_content/main_content_view');

const private_FM = r => require.ensure([], () => r(require('../page/main_content/private_FM/private_FM')), 'private_FM');


export default {
  path: '/',
  component: main_content,
  redirect: '/main',
  children: [
    {
      path: '/main',
      component: main_content_view,
      redirect: '/private_FM',
      children: [
        {
          path: '/private_FM',
          component: private_FM,
          // redirect: '/private_FM/main',
        },
      ]
    }
  ]
}
