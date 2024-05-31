<script setup lang="ts">
import { RouterView } from 'vue-router'
import Notification from '@/components/Notification/Notification.vue'
</script>

<template>
  <!-- 全局通知组件 -->
  <Notification />
  <router-view></router-view>
</template>

<style scoped></style>
