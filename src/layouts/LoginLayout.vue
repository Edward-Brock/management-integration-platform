<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/Header/BaseHeader.vue'
</script>

<template>
  <v-app>
    <!-- Header -->
    <v-app-bar class="px-4" style="user-select: none" :elevation="0">
      <BaseHeader :hideContent="true" />
    </v-app-bar>
    <!-- main -->
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
