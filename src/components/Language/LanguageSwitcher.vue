<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { inject, onMounted, reactive, ref } from 'vue'
import { useOptionStore } from '@/stores/optionStore'

const { t } = useI18n()
const optionStore = useOptionStore()
const menu = ref(false)
const reload: any = inject('reload')

interface Options {
  language?: string
}

const languages = reactive({
  select: 'navigator.language',
  language: [
    { title: t('setting.language.autoDetection'), value: 'navigator.language' },
    { title: t('setting.language.zhCN'), value: 'zh-CN' },
    { title: t('setting.language.enUS'), value: 'en-US' }
  ]
})

function changeLanguage(language: string) {
  optionStore.setLanguage(language)
  languages.select = language
  // 刷新页面
  reload()
}

// 获取本地存储的 option 并转为 JSON 格式，如果获取不到则返回一个空对象
let options: Options = {}
try {
  const storedOptions = localStorage.getItem('option')
  if (storedOptions) {
    options = JSON.parse(storedOptions)
  }
} catch (error) {
  console.error('Error parsing localStorage option:', error)
}

onMounted(() => {
  languages.select = options.language || 'navigator.language'
})
</script>

<template>
  <v-menu
    style="user-select: none"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-translate" :ripple="false" v-bind="props"></v-btn>
    </template>
    <v-list>
      <v-card class="pa-2 text-body-1" elevation="0">
        <v-card-item>{{ $t('setting.language.title') }}</v-card-item>

        <v-list-item
          v-for="(item, index) in languages.language"
          :key="index"
          @click="changeLanguage(item.value)"
          :active="item.value === languages.select"
          active-class="active"
          :append-icon="item.value === languages.select ? 'mdi-check' : ''"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-card>
    </v-list>
  </v-menu>
</template>

<style scoped></style>
