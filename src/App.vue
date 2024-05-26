<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/Header/BaseHeader.vue'
</script>

<template>
  <v-app>
    <!-- Header -->
    <v-app-bar class="px-6" style="user-select: none" :elevation="0" height="48">
      <BaseHeader />
    </v-app-bar>
    <!-- main -->
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
