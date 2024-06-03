<script setup lang="ts">
import BaseHeader from '@/components/Header/BaseHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <!-- Header -->
    <v-app-bar class="px-4" style="user-select: none" :elevation="0">
      <BaseHeader :hideContent="false" />
    </v-app-bar>
    <!-- main -->
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
