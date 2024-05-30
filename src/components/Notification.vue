<script setup lang="ts">
import { useNotificationStore } from '@/stores/notificationStore'

const notificationStore = useNotificationStore()
const { notifications, removeNotification } = notificationStore
</script>

<template>
  <div class="notification-container">
    <v-alert
      class="mb-2"
      v-for="(notification, index) in notifications"
      :key="index"
      :type="notification.type"
      dismissible
      @dismissed="removeNotification(notification)"
    >
      {{ notification.message }}
    </v-alert>
  </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
}
</style>
