import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8;'
  }
})

// request 拦截器
instance.interceptors.request.use(
  (config) => {
    const headers = config.headers || {}
    headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    config.headers = headers
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
      switch (error.response.status) {
        case 400:
          console.log('异常错误')
          break
        case 401:
          console.log('TOKEN 过期')
          break
        case 403:
          console.log('拒绝访问')
          break
        case 404:
          console.log('请求地址错误')
          // go to 404 page
          break
        case 500:
          console.log('服务器错误')
          // go to 500 page
          break
        default:
          console.log(error.message)
      }
    }
    if (!window.navigator.onLine) {
      alert('网络出现问题，请重新连接')
      return
    }
    return Promise.reject(error)
  }
)

export default instance
