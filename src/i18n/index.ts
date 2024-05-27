import { createI18n } from 'vue-i18n'
import zhCN from '@/i18n/zh-CN'
import enUS from '@/i18n/en-US'

const message = {
  'zh-CN': zhCN,
  'en-US': enUS
}

const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'zh-CN',
  messages: message
})

export default i18n
