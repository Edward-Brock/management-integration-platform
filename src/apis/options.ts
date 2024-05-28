import { request } from '@/utils/methods'

export function getOptionsList() {
  return request('GET', 'options/autoload')
}
