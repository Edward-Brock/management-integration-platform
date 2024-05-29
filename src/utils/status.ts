import router from '@/router'

export const errorCodeJudgment = (status: number | string): string => {
  let message: string = ''
  switch (status) {
    case 400:
      message = '异常错误'
      console.log('异常错误')
      break
    case 401:
      message = 'TOKEN 过期'
      console.log('TOKEN 过期')
      break
    case 403:
      message = '拒绝访问'
      console.log('拒绝访问')
      break
    case 404:
      message = '请求地址错误'
      console.log('请求地址错误')
      break
    case 408:
      message = '请求超时'
      console.log('请求超时')
      break
    case 500:
      message = '服务器错误'
      console.log('服务器错误')
      break
    case 501:
      message = '服务未实现'
      console.log('服务未实现')
      break
    case 502:
      message = '网络错误'
      console.log('网络错误')
      break
    case 503:
      message = '服务不可用'
      console.log('服务不可用')
      break
    case 504:
      message = '网络超时'
      console.log('网络超时')
      break
    case 505:
      message = 'HTTP 版本不受支持'
      console.log('HTTP 版本不受支持')
      break
    default:
      message = `连接出错，${status}！`
  }
  if (!window.navigator.onLine) {
    message = '网络出现问题，请重新连接'
  }
  return message
}
