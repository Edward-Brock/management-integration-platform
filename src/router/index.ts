import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true }, // 需要登录验证
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/user/profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/option',
          name: 'option',
          component: () => import('../views/OptionView.vue')
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
    },
    {
      path: '/register',
      component: LoginLayout,
      children: [
        {
          path: '',
          name: 'register',
          component: () => import('../views/RegisterView.vue')
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const isLogin = store.isLogin // 获取是否登录的状态

  // 如果目标路由需要验证且未登录，则跳转至登录页
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLogin) {
    next({ name: 'login' })
  } else if (to.name == 'login' && isLogin) {
    // 如果已登录且试图访问登录页，则跳转至首页
    next({ name: 'home' })
  } else {
    // 如果以上条件都不满足，则继续导航
    next()
  }
})

export default router
