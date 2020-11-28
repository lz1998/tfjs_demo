import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout/Layout.vue'),
    redirect:'/home',
    children: [
      {
        name: 'Home',
        path: "/home",
        component: () => import('@/views/Home/Home.vue')
      },
      {
        name: 'FirstExample',
        path: "/first-example",
        component: () => import('@/views/FirstExample/FirstExample.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
