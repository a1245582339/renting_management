import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/main'
    },
    {
      path: '/404',
      name: '404',
      component: () =>
      import('./views/error-page/404'),
    },
    {
      path: '/401',
      name: '401',
      component: () =>
      import('./views/error-page/401'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/main',
      component: () =>
        import('./views/Main'), 
      children: [
        {
          path: '/',
          redirect: 'home',
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/content/home'), 
        },
        {
          path: 'community',
          name: 'community',
          component: () => import('./views/content/community'), 
        },
        {
          path: 'room',
          name: 'room',
          component: () => import('./views/content/room'), 
        },
        {
          path: 'university',
          name: 'university',
          component: () => import('./views/content/university'), 
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('./views/content/university'), 
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('./views/content/admin'), 
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('./views/content/user'), 
        }
      ]
    },
    {
      path: '*',
      component: () =>
      import('./views/error-page/404'),
    },
  ],
});
