<script setup lang="ts">
import BaseHeader from '@/components/Header/BaseHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app class="bg-grey-lighten-5">
    <!-- Header -->
    <v-app-bar class="px-4 header_bg" :elevation="0">
      <BaseHeader :hideContent="false" />
    </v-app-bar>
    <!-- main -->
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.header_bg {
  background: rgba(255, 255, 255, 0.75) !important;
  backdrop-filter: blur(25px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
