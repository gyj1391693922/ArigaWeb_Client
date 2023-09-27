import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout.vue'

Vue.use(VueRouter)

const routes = [
  //===== 登录 ======
  {
    path: "/login",
    name: "Login",
    component: ()=>import('@/views/home/login/Login.vue')
  },
  //===== 注册 ======
  {
    path: "/register",
    name: "Register",
    component: ()=>import('@/views/home/login/register.vue')
  },
  // ===== 主页 =====
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/forum',
    children:[//子路由
        //主页
      {
        path: 'home',
        name: 'List',
        component: ()=>import('@/views/home/list.vue')
      },
      {
        path: 'list',
        name: 'Home',
        component: ()=>import('@/views/home/Home.vue')
      },
      {
        path: 'detail',
        name: 'Detail',
        component: ()=>import('@/views/home/detail.vue')
      },
      {
        path: 'playVideo',
        name: 'PlayVideo',
        component: ()=>import('@/views/home/playVideo.vue')
      },
      {
        path: 'forum',
        name: 'Forum',
        component: ()=>import('@/views/home/forum.vue'),
      },
      {
        path: 'forums',
        name: 'Forums',
        component: ()=>import('@/views/home/forum/forums.vue')
      },
      {
        path: 'tutorial',
        name: 'Tutorial',
        component: ()=>import('@/views/home/tutorial/tutorial.vue')
      },
      {
        path: 'tutorialDetail',
        name: 'TutorialDetail',
        component: ()=>import('@/views/home/tutorial/tutorialDetail.vue')
      },
      {
        path: 'test',
        name: 'Test',
        component: ()=>import('@/views/test/test.vue')
      },
      {
        path: 'write',
        name: 'Write',
        component: ()=>import('@/views/write/write.vue')
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
