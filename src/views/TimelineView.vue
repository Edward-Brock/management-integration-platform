<script setup lang="ts">
import { inject, ref } from 'vue'
import { deleteTimeline, getUserAllTimeline, postTimeline } from '@/apis/timeline'
import { useUserStore } from '@/stores/userStore'
import { getCosObjectUrl } from '@/utils/cos'
import { useNotificationStore } from '@/stores/notificationStore'
import { useI18n } from 'vue-i18n'

type Timeline = {
  id: string
  content: string
  is_delete: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
}

const reload: any = inject('reload')
const { t } = useI18n()
const authInfo = useUserStore().authInfo
const notificationStore = useNotificationStore()

const form = ref()
const userAvatar = ref('')
getCosObjectUrl(authInfo.avatar)
  .then((url) => {
    if (typeof url === 'string') {
      userAvatar.value = url
    }
  })
  .catch((error) => {
    console.error('Error getting object URL:', error)
  })

const allTimelines = ref<Timeline[]>([])
const timelinesData = (await getUserAllTimeline(authInfo)) as Timeline[]
timelinesData.forEach((timeline) => {
  timeline.content = timeline.content.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
})
allTimelines.value = timelinesData

const timeline = ref('')
const timelineRules = ref([(v: any) => !!v || t('timeline.timelineRequired')])

async function validate(e: any) {
  e.preventDefault()
  const { valid } = await form.value.validate()

  if (valid) {
    // 提交要发布的时间线内容
    timeline.value = timeline.value
      .replace(/\r\n/g, '<br/>')
      .replace(/\n/g, '<br/>')
      .replace(/\s/g, ' ')
    const result = (await postTimeline({
      content: timeline.value,
      userId: authInfo.id
    })) as Timeline
    if (result) {
      form.value.reset()
      notificationStore.addNotification({
        message: t('general.window.save_success'),
        type: 'success'
      })
      const newTimeline: Timeline = {
        id: result.id,
        content: result.content,
        is_delete: false,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        userId: result.userId
      }
      allTimelines.value.unshift(newTimeline)
    }
  }
}

async function clickDeleteTimeline(id: string) {
  const result = await deleteTimeline(id)
  if (result)
    notificationStore.addNotification({
      message: t('general.window.delete_success'),
      type: 'success'
    })
  reload()
}
</script>

<template>
  <div class="w-100 d-flex flex-column justify-center align-center mt-4">
    <v-sheet class="w-100 w-sm-75 w-md-50 mx-auto py-4 rounded" width="300">
      <v-form ref="form" class="w-100 px-4 d-flex flex-column align-center">
        <v-textarea
          class="w-100 textarea"
          variant="underlined"
          v-model="timeline"
          :counter="1000"
          :rules="timelineRules"
          :placeholder="t('timeline.placeholder')"
          required
        ></v-textarea>

        <div class="d-flex flex-column align-self-end">
          <v-btn variant="tonal" block @click="validate">{{ $t('timeline.submit') }}</v-btn>
        </div>
      </v-form>
    </v-sheet>

    <v-card class="w-100 w-sm-75 w-md-50 mt-4 rounded" elevation="0" :title="t('timeline.review')">
      <v-timeline
        class="mt-2"
        align="start"
        side="end"
        density="comfortable"
        truncate-line="start"
        fill-dot
      >
        <v-timeline-item
          class="w-100"
          v-for="timeline in allTimelines"
          :key="timeline.id"
          :icon="userAvatar"
          size="16"
        >
          <v-card elevation="0" :title="authInfo.username">
            <template v-slot:prepend>
              <v-avatar size="36">
                <v-img :src="userAvatar"></v-img>
              </v-avatar>
            </template>

            <v-card-text>
              <span v-html="timeline.content"></span>
              <div class="mt-2 text-grey-darken-1">
                {{ timeline.createdAt }}
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                variant="plain"
                prepend-icon="mdi-trash-can-outline"
                @click="clickDeleteTimeline(timeline.id)"
                >{{ $t('general.window.delete') }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card>
  </div>
</template>

<style scoped></style>
