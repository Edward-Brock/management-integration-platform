import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      component: LoginLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../views/LoginView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  // 获取是否登录的状态
  const isLogin = store.isLogin
  // 访问的请求不是 login 且未登录则跳转至登录页
  if (to.name !== 'login' && !isLogin) {
    next({ name: 'login' })
  } else if (to.name == 'login' && isLogin) {
    // 已登录并继续尝试登录请求则跳转至首页
    next({ name: 'home' })
  } else {
    // 不存在上述判断继续执行
    next()
  }
})

export default router
