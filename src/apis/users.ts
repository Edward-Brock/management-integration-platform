import { request } from '@/utils/methods'

interface Login {
  username: string
  password: string
}

export function postUserLogin(params: Login) {
  return request('POST', 'auth/login', { data: params })
}
