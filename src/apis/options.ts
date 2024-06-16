import { request } from '@/utils/methods'

/**
 * 获取自动加载的网站配置列表
 */
export function getOptionsList() {
  return request('GET', 'options/autoload')
}

/**
 * 获取网站配置全部数据
 */
export function getOptions() {
  return request('GET', 'options/autoload')
}

/**
 * 更新网站配置数据
 * @param name 配置名称
 * @param data 需要更新的值
 */
export async function patchOptions(name: string, data?: any) {
  return request('PATCH', 'options/' + name, { data })
}
