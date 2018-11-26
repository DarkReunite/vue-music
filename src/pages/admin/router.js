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
      component: Home,
      children: [
        {
          path: '',
          component: List,
          props: {page: 1}
        },
        {
          path: 'list/:page',
          component: List,
          props: true
        },
        {
          path: 'upload',
          component: Upload,
        }
      ]
    }
  ]
})
