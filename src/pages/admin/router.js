import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import List from './views/List'
import Upload from './views/Upload';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'list',
          component: List,
        },
        {
          path: 'upload',
          component: Upload,
        }
      ]
    }
  ]
})
