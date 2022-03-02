import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/pages/Home.vue'
import History from '@/pages/History.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: History
  }
]

const router = new VueRouter({
  routes
})

export default router
