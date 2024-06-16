<script setup lang="ts">
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { changeUserAvatar } from '@/apis/users'
import { useNotificationStore } from '@/stores/notificationStore'
import { useUserStore } from '@/stores/userStore'

const { t } = useI18n()
const avatarDialog = ref(false)
const file = ref<File | null>(null)
const notificationStore = useNotificationStore()
const userStore = useUserStore()
const reload: any = inject('reload')

async function uploadFile() {
  // 1. 判断 file 中是否存在内容
  if (!file.value) return

  try {
    // 2. 将 file 通过 api 传给后端
    const response = await changeUserAvatar(file.value)
    // 3. 如果 response 为空则抛出错误
    if (!response) {
      throw new Error('Upload failed')
    }

    // 4. 全局通知保存成功
    notificationStore.addNotification({
      message: t('setting.window.save_success'),
      type: 'success'
    })
    // 5. 刷新保存持久化用户信息数据
    await userStore.refreshUserInfo()
    // 6. 刷新页面更新头像
    reload()
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
</script>

<template>
  <v-dialog v-model="avatarDialog" max-width="600px">
    <v-card :title="$t('user.upload_avatar')">
      <v-card-text>
        <v-file-input
          v-model="file"
          show-size
          accept=".png,.jpeg,.gif,.webp"
          :label="t('setting.window.choose_avatar')"
          outlined
          dense
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="uploadFile">{{ $t('setting.window.upload') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
