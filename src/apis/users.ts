import { request } from '@/utils/methods'

interface Login {
  username: string
  password: string
}

export function postUserLogin(data: Login) {
  return request('POST', 'auth/login', { data })
}

export function getUserProfile() {
  return request('GET', 'auth/profile')
}
