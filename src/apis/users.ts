import { request } from '@/utils/methods'

interface Login {
  username: string
  password: string
}

/**
 * 用户登录接口
 * @param data username, password
 */
export function postUserLogin(data: Login) {
  return request('POST', 'auth/login', { data })
}

/**
 * 获取当前登录用户信息
 */
export function getUserProfile() {
  return request('GET', 'auth/profile')
}
