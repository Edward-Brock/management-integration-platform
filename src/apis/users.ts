import { request } from '@/utils/methods'

interface User {
  username: string
  password: string
}

/**
 * 用户注册接口
 * @param data username, password
 */
export function postUserRegister(data: User) {
  return request('POST', 'auth/register', { data })
}

/**
 * 用户登录接口
 * @param data username, password
 */
export function postUserLogin(data: User) {
  return request('POST', 'auth/login', { data })
}

/**
 * 获取当前登录用户信息
 */
export function getUserProfile() {
  return request('GET', 'auth/profile')
}

export async function patchUserProfile(id: string, data: any) {
  return request('PATCH', 'users/' + id, { data })
}
