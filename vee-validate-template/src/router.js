import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import UserSign from '@/views/UserSign'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/',
      props: true,
      component: Home,
      children: [
        { path: '', component: UserSign, props: true, name: 'Login' }
        // path: '/dashboard'}
      ]
    }
  ]
})

export default router
