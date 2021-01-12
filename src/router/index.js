import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import BaseLayout from '../layout/baseLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    component: BaseLayout,
    children: [{
      path: '/home',
      name: 'Home',
      component: Home
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
