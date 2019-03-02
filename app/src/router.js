import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('./views/Main.vue'),
      children: [{
        path: '/',
        redirect: 'room'
      }, {
        path: 'room',
        name: 'room',
        component: () => import('./views/page/room.vue')
      }, {
        path: 'detail',
        name: 'detail',
        component: () => import('./views/page/roomDetail.vue')
      }, {
        path: 'order',
        name: 'order',
        component: () => import('./views/page/order.vue')
      }, {
        path: 'me',
        name: 'me',
        component: () => import('./views/page/me.vue')
      }]
    }
  ]
})
