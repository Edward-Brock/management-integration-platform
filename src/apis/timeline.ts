import { request } from '@/utils/methods'

/**
 * 获取当前用户的所有时间线
 * @param id 用户 ID
 */
export function getUserAllTimeline(id: string) {
  return request('GET', 'timelines/' + id + '/allTimelines')
}

/**
 * 创建时间线数据
 * @param data userId：用户 ID；content：时间线内容
 */
export function postTimeline(data: { userId: any; content: string }) {
  return request('POST', 'timelines/', { data })
}

/**
 * 删除时间线数据
 * @param id 时间线 ID
 */
export function deleteTimeline(id: string) {
  return request('DELETE', 'timelines/' + id)
}
