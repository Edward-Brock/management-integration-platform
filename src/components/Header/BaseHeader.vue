<script setup lang="ts">
import { getOptionsList } from '@/apis/options'
import { onMounted, reactive, ref } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'
import SettingsPanel from '@/components/Panel/SettingPanel.vue'
import LanguageSwitcher from '@/components/Language/LanguageSwitcher.vue'

interface Option {
  name: string
  value: string | null
  autoload: boolean
}

interface UserInfo {
  id: number
  name: string
  username: string
  avatar: string
  email: string
}

// 从 Layout 中读取 hideContent 判断是否需要隐藏部分组件
const props = defineProps(['hideContent'])
const baseUrl = import.meta.env.VITE_APP_BASE_URL

const service = reactive({
  info: [] as Option[],
  name_simple: '',
  name_full: '',
  logo: ''
})

const userInfo = ref({} as UserInfo)

function logout() {
  const user = useUserStore()
  user.logout()
}

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
  service.logo = getValueByName(service.info, 'service_logo') || ''
  service.name_full = getValueByName(service.info, 'service_name_full') || ''
  service.name_simple = getValueByName(service.info, 'service_name_simple') || ''

  const userStore = useUserStore()
  userInfo.value = {
    ...userStore.authInfo,
    avatar: userStore.authInfo.avatar.startsWith(baseUrl)
      ? userStore.authInfo.avatar
      : `${baseUrl}/${userStore.authInfo.avatar}`
  }
})
</script>

<template>
  <div class="w-100 d-flex align-center justify-space-between">
    <div>
      <v-img
        class="cursor-pointer"
        :width="46"
        aspect-ratio="16/9"
        cover
        :src="service.logo"
        @click="router.push('/')"
      >
        <v-tooltip activator="parent" location="bottom start">{{ service.name_full }}</v-tooltip>
      </v-img>
    </div>

    <template class="d-flex justify-center align-center">
      <!-- 语言切换 -->
      <LanguageSwitcher />
      <!-- 判断当前 Layout 是否需要隐藏下列组件 -->
      <template v-if="!props.hideContent">
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
        <!-- isLogin 登录标记为 True 则显示当前用户头像 -->
        <div v-else>
          <template class="d-flex align-center justify-center">
            <!-- 设置面板 -->
            <SettingsPanel class="ml-2" />
            <!-- 用户头像 -->
            <v-menu min-width="250px" rounded>
              <template v-slot:activator="{ props }">
                <v-btn class="ml-2" size="48" icon="" v-bind="props" :ripple="false">
                  <v-avatar size="36" :image="userInfo.avatar"></v-avatar>
                </v-btn>
              </template>
              <v-card class="mt-4" min-width="300" max-width="400" elevation="2">
                <template v-slot:prepend>
                  <v-avatar class="mr-2" size="48" :image="userInfo.avatar"></v-avatar>
                </template>

                <template v-slot:title>
                  <!-- 显示当前登录的用户真实姓名字段 -->
                  <div class="font-weight-black">
                    {{ userInfo.name ? userInfo.name : userInfo.username }}
                  </div>

                  <!-- 显示当前登录的用户名 -->
                  <div class="text-subtitle-1 text-grey-darken-1">{{ userInfo.username }}</div>
                </template>
                <v-card-text>
                  <div class="mx-auto mr-4">
                    <v-divider class="my-2"></v-divider>
                    <v-btn
                      variant="plain"
                      :ripple="false"
                      prepend-icon="mdi-account"
                      @click="router.push('/user/profile')"
                    >
                      {{ $t('user.profile') }}
                    </v-btn>
                    <v-divider class="my-2"></v-divider>
                    <v-btn
                      variant="plain"
                      :ripple="false"
                      prepend-icon="mdi-logout"
                      @click="logout"
                    >
                      {{ $t('user.signOut') }}
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-menu>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped></style>
