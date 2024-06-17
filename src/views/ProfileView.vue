<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import { patchUserProfile } from '@/apis/users'
import AvatarUpload from '@/components/ProfileCard/AvatarUpload.vue'

const { t } = useI18n()
const userStore = useUserStore()
const reload: any = inject('reload')

const form = ref()
const userInfo = reactive({
  avatar: '',
  name: '',
  username: '',
  email: '',
  mobile: ''
})

const _userInfo = reactive({ ...userInfo })

const createRequiredRule = (messageKey: string) => [(v: any) => !!v || t(messageKey)]

const createLengthRule = (
  min: number,
  max: number,
  minMessageKey: string,
  maxMessageKey: string
) => [
  (v: any) => !!v || t(minMessageKey),
  (v: any) => (v && v.length >= min) || t(minMessageKey),
  (v: any) => (v && v.length <= max) || t(maxMessageKey)
]

const UsernameRules = ref(
  createLengthRule(4, 20, 'validation.usernameRequired', 'validation.usernameLengthMax')
)
const NicknameRules = ref(createRequiredRule('validation.NicknameRequired'))
const avatarDialog = ref(false) // 用于控制 AvatarUpload 组件的显示

async function validate(e: any) {
  e.preventDefault()
  const { valid } = await form.value.validate()

  if (valid) {
    // 验证通过后调用更新用户信息方法
    await updateUserInfo()
  }
}

/**
 * 用户信息获取
 */
async function fetchUserInfo() {
  try {
    const data = userStore.authInfo
    Object.assign(_userInfo, data)
    Object.assign(userInfo, data)
    userInfo.avatar = `${import.meta.env.VITE_APP_BASE_URL}/${userStore.authInfo.avatar}`
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
}

/**
 * 更新用户信息
 */
async function updateUserInfo() {
  try {
    const changes: Partial<typeof userInfo> = {}
    // 循环获取已被修改的字段
    for (const key in userInfo) {
      if (
        key !== 'avatar' &&
        userInfo[key as keyof typeof userInfo] !== _userInfo[key as keyof typeof _userInfo]
      ) {
        changes[key as keyof typeof userInfo] = userInfo[key as keyof typeof userInfo]
      }
    }

    if (Object.keys(changes).length > 0) {
      // 将修改的字段传递给 api
      await patchUserProfile(userStore.authInfo.id, changes)
      Object.assign(_userInfo, changes)
      // 刷新持久化用户信息数据
      await userStore.refreshUserInfo()
      // 刷新页面
      reload()
    }
  } catch (error) {
    console.error('Error updating user info:', error)
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<template>
  <v-sheet
    class="h-100 w-75 pa-10 mt-4 mx-auto d-flex flex-column align-center"
    rounded
    style="user-select: none"
  >
    <h2 class="mb-8">{{ $t('user.prefix_profile') }}</h2>
    <v-form class="d-flex flex-column align-center" ref="form" @submit="validate">
      <v-tooltip location="center" :text="t('user.change_avatar')">
        <template v-slot:activator="{ props }">
          <v-avatar
            v-bind="props"
            :image="userInfo.avatar"
            size="128"
            @click="avatarDialog = true"
          ></v-avatar>
        </template>
      </v-tooltip>

      <v-text-field
        class="mt-12"
        v-model="userInfo.username"
        :rules="UsernameRules"
        :label="$t('login.username')"
        prepend-inner-icon="mdi-account-circle-outline"
        variant="outlined"
        width="360"
        disabled
        required
      ></v-text-field>

      <v-text-field
        class="mt-2"
        v-model="userInfo.name"
        :rules="NicknameRules"
        :label="$t('user.name')"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        width="360"
      ></v-text-field>

      <v-text-field
        class="mt-2"
        v-model="userInfo.email"
        :label="$t('user.email')"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        width="360"
      ></v-text-field>

      <v-text-field
        class="mt-2"
        v-model="userInfo.mobile"
        :label="$t('user.mobile')"
        prepend-inner-icon="mdi-phone"
        variant="outlined"
        width="360"
      ></v-text-field>

      <div class="w-100 d-flex flex-column">
        <v-btn type="submit" class="mt-4" variant="tonal" size="large" block
          >{{ $t('user.update_profile') }}
        </v-btn>
      </div>
    </v-form>
  </v-sheet>

  <AvatarUpload v-model="avatarDialog" />
</template>

<style scoped></style>
