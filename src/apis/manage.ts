import { request } from '@/utils/methods'

/**
 * 获取总用户数详细信息
 */
export function getCountTotalNumberUsers() {
  return request('GET', 'manage/countTotalNumberUsers')
}
