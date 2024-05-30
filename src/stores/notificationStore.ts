import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 通过 Vuetify 实现全局消息通知
 *
 * 示例：
 *
 * const notificationStore = useNotificationStore()
 *
 * notificationStore.addNotification({
 *   message: errorMessage,
 *   type: 'error'
 * })
 */

interface Notification {
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])

  function addNotification(notification: Notification) {
    notifications.value.push(notification)
    setTimeout(() => {
      removeNotification(notification)
    }, 5000) // 自动移除通知，5秒后
  }

  function removeNotification(notification: Notification) {
    const index = notifications.value.indexOf(notification)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return { notifications, addNotification, removeNotification }
})
