import axios from 'axios'
import { errorCodeJudgment } from '@/utils/status'
import { useUserStore } from '@/stores/userStore'
import { watchEffect } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  withCredentials: true
})

// request 拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore?.tokenInfo?.access_token

    // 监视当前登录 Token 是否过期
    watchEffect(() => {
      if (userStore.isTokenExpired()) {
        userStore.logout()
      }
    })

    // 如果 Token 已获取，则在 headers 内带入 Authorization
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response
  },
  (error) => {
    const notificationStore = useNotificationStore()
    let errorMessage = '请求失败'
    if (error.response) {
      errorMessage = error.response.data.message || errorCodeJudgment(error.response.status)
      error.response.data = {
        status: 'error',
        message: errorMessage,
        data: error.response.data
      }
    }
    notificationStore.addNotification({
      message: errorMessage,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default instance
