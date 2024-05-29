import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref()
    function getUserInfo(user: any) {
      userInfo.value = user
    }

    return { userInfo, getUserInfo }
  },
  {
    persist: true
  }
)
