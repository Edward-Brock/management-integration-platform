<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { useI18n } from 'vue-i18n'
import { getCosObjectUrl } from '@/utils/cos'
import { ref } from 'vue'

const { t } = useI18n()

function getGreetingByTime(date: Date): string {
  const hours = date.getHours()

  if (hours >= 6 && hours < 9) {
    return t('earlyMorning.earlyMorning')
  } else if (hours >= 9 && hours < 11) {
    return t('earlyMorning.morning')
  } else if (hours >= 11 && hours < 13) {
    return t('earlyMorning.noon')
  } else if (hours >= 13 && hours < 16) {
    return t('earlyMorning.afternoon')
  } else if (hours >= 16 && hours < 19) {
    return t('earlyMorning.evening')
  } else if (hours >= 19 && hours < 24) {
    return t('earlyMorning.night')
  } else {
    return t('earlyMorning.lateNight')
  }
}

const currentDate = new Date()
const greetingByTime = getGreetingByTime(currentDate)
const userAvatar = ref('')
const userInfo = useUserStore().authInfo

getCosObjectUrl(userInfo.avatar)
  .then((url) => {
    if (typeof url === 'string') {
      userAvatar.value = url
    }
  })
  .catch((error) => {
    console.error('Error getting object URL:', error)
  })
</script>

<template>
  <v-card width="320" height="320" elevation="0" class="pa-6 d-flex flex-column justify-end">
    <v-avatar class="mb-4" size="96" :image="userAvatar"></v-avatar>

    <h2 class="mb-1 font-weight-black text-h4">
      {{ userInfo.name ? userInfo.name : userInfo.username }}
    </h2>
    <div class="text-h6 text-grey-darken-1">{{ greetingByTime }}</div>
  </v-card>
</template>

<style scoped></style>
