
const main_content = () => import('../page/main_content/main_content');

const home = r => require.ensure([], () => r(require('../page/main_content/home/home')), 'home')

export default {
  path: '/',
  component: main_content,
  redirect: '/home',
  children: [
    {
      path: '/home',
      component: home
    }
  ]
}
