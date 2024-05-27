<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">{{ $t('general.dashboard') }}</RouterLink>
    <RouterLink to="/about">{{ $t('general.about') }}</RouterLink>
  </nav>
</template>

<style scoped></style>
