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

/**
 * 更新用户信息
 * @param id 用户 ID
 * @param data
 */
export async function patchUserProfile(id: string, data?: any) {
  return request('PATCH', 'users/' + id, { data })
}

/**
 * 更改用户头像
 * @param avatar 头像文件
 */
export function changeUserAvatar(avatar: File) {
  const formData = new FormData()
  formData.append('avatar', avatar)
  return request('POST', 'users/upload', {
    data: formData
  })
}

/**
 * 获取全部用户
 */
export function getAllUsers() {
  return request('GET', 'roles/details')
}

/**
 * 删除用户
 * @param id 用户 ID
 */
export function deleteUser(id: string) {
  return request('DELETE', 'users/' + id)
}
