import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserProfile, postUserLogin, postUserRegister } from '@/apis/users'
import router from '@/router'

interface User {
  username: string
  password: string
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户登录状态，False：未登录；True：已登录
    const isLogin = ref(false)
    // 存储 Token 信息
    const tokenInfo = ref()
    // 存储用户信息
    const authInfo = ref()

    // 注册逻辑
    async function register(data: User) {
      const response = await postUserRegister(data)

      // 如果注册成功，则自动进行登录
      if (response) {
        await login(data)
      }
    }

    // 登录逻辑
    async function login(data: User) {
      const response = await postUserLogin(data)
      if (response) {
        // 标记登录状态
        isLogin.value = true
        // 存储 Token 信息
        tokenInfo.value = response

        // 通过上面获取到的 access_token 换取当前用户 ID 及权限
        authInfo.value = await getUserProfile()

        // 如果登录成功则自动跳转至首页
        await router.push('/')
      }
    }

    // 退出逻辑
    function logout() {
      isLogin.value = false
      tokenInfo.value = ''
      authInfo.value = ''
      router.push('/').then(() => window.location.reload())
    }

    // 检查 Token 是否过期
    function isTokenExpired() {
      if (!tokenInfo.value) return
      if ('exp' in tokenInfo.value) {
        const currentTimestamp = Math.floor(Date.now() / 1000) // 当前时间的 Unix 时间戳
        return currentTimestamp >= tokenInfo.value.exp
      }
      return true
    }

    return { isLogin, tokenInfo, authInfo, register, login, logout, isTokenExpired }
  },
  {
    persist: true
  }
)
