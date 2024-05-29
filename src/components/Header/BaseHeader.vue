<script setup lang="ts">
import { getOptionsList } from '@/apis/options'
import { onMounted, reactive } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores/user'

interface Option {
  name: string
  value: string | null
  autoload: boolean
}

const service = reactive({
  info: [] as Option[],
  name: '',
  logo: ''
})

/**
 * 根据数组中的 name 值获取对象的 value
 * @param array 需要查找 name 和 value 的数组
 * @param name 想要查找的 name 值
 */
const getValueByName = (array: Option[], name: string): string | null => {
  const item = array.find((obj) => obj.name === name)
  return item?.value ?? null
}

onMounted(async () => {
  await getOptionsList().then((res: any) => {
    service.info = res
  })
  service.name = getValueByName(service.info, 'service_name_simple') || ''
  service.logo = getValueByName(service.info, 'service_logo') || ''
})
</script>

<template>
  <div class="w-100 d-flex align-center justify-space-between">
    <div>
      <v-img :width="46" aspect-ratio="16/9" cover :src="service.logo"></v-img>
    </div>
    <!-- 通过 Pinia 中的 isLogin 登录标记判断当前登录状态，如果为 False 则显示登录按钮 -->
    <div v-if="!useUserStore().isLogin">
      <div @click="router.push('/login')">
        <v-col cols="auto">
          <v-btn append-icon="mdi-login">
            {{ $t('user.signIn') }}
          </v-btn>
        </v-col>
      </div>
    </div>
    <!-- isLogin 登陆标记为 True 则显示当前用户头像 -->
    <div v-else>
      <v-avatar color="surface-variant"></v-avatar>
    </div>
  </div>
</template>

<style scoped></style>
