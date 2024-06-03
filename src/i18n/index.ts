import { createI18n } from 'vue-i18n'
import zhCN from '@/i18n/zh-CN'
import enUS from '@/i18n/en-US'

const message = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 将本地存储的 option 转为 json 格式
const options = JSON.parse(localStorage.getItem('option') || '')

const i18n = createI18n({
  // 如果 options.language 存在值则使用，否则使用默认值（判断当前系统语言环境）
  locale: options.language || 'navigator.language',
  legacy: false,
  fallbackLocale: 'zh-CN',
  messages: message,
  // 去除国际化提示错误
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true,
  fallbackWarn: false
})

export default i18n
