<script setup lang="ts">
import ProfileCard from '@/components/ProfileCard/ProfileCard.vue'
import TimelineView from '@/views/TimelineView.vue'
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <ProfileCard />
      </v-col>
      <v-col>
        <TimelineView />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
