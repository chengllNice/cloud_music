
const main_content = () => import('../page/main_content/main_content');

const home = r => require.ensure([], () => r(require('../page/main_content/home/home')), 'home');
const home_recommend = r => require.ensure([], () => r(require('../page/main_content/home/home_recommend/home_recommend')), 'home_recommend');

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
        }
      ]
    }
  ]
}
