import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useOptionStore = defineStore(
  'option',
  () => {
    // 引入 i18n
    const { locale } = useI18n({ useScope: 'global' })

    const language = ref('navigator.language')

    function setLanguage(lng: string) {
      // 将结果存至 language 同时持久化
      language.value = lng
      // 修改 i18n 本地化语言
      locale.value = lng
    }

    return {
      language,
      setLanguage
    }
  },
  {
    persist: true
  }
)
