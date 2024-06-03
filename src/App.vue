<script setup lang="ts">
import { RouterView } from 'vue-router'
import Notification from '@/components/Notification/Notification.vue'
import { nextTick, provide, ref } from 'vue'

const isRouterActive = ref(true)

provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})
</script>

<template>
  <!-- 全局通知组件 -->
  <Notification />
  <router-view v-if="isRouterActive"></router-view>
</template>

<style scoped></style>
