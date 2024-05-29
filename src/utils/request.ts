import axios from 'axios'
import { errorCodeJudgment } from '@/utils/status'
import { useUserStore } from '@/stores/user'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  withCredentials: true
})

// request 拦截器
instance.interceptors.request.use(
  (config) => {
    const token = useUserStore()?.tokenInfo?.access_token
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    } else {
      console.log('No token found')
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
    if (error.response) {
      errorCodeJudgment(error.response.status)
    }
    return Promise.reject(error)
  }
)

export default instance
