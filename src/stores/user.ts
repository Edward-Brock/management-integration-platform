import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserProfile, postUserLogin } from '@/apis/users'

interface UserInfo {
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

    // 登录逻辑
    async function login(data: UserInfo) {
      const response = await postUserLogin(data)
      if (response) {
        // 标记登录状态
        isLogin.value = true
        // 存储 Token 信息
        tokenInfo.value = response

        // 通过上面获取到的 access_token 换取当前用户 ID 及权限
        authInfo.value = await getUserProfile()
      }
    }

    // 退出逻辑
    function logout() {
      isLogin.value = false
      tokenInfo.value = ''
      authInfo.value = ''
    }

    return { isLogin, tokenInfo, authInfo, login, logout }
  },
  {
    persist: true
  }
)
