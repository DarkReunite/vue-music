import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Library from './views/Library.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          redirect: '/library'
        },
        {
          path: 'library',
          component: Library
        }
      ]
    }
  ]
})
