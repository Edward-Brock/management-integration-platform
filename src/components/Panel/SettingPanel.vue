<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

const { t } = useI18n()
const theme = useTheme()

// 面板状态
const isPanelOpen = ref(false)
// 当前版本
const currentRelease = ref('')

const settings = reactive({
  themes: {
    select: 'lightTheme',
    theme: [
      { label: t('setting.theme.light'), value: 'lightTheme', disabled: false },
      { label: t('setting.theme.dark'), value: 'darkTheme', disabled: true }
    ]
  }
})

watch(settings, (newValue) => {
  theme.global.name.value = newValue.themes.select
})

onMounted(() => {
  currentRelease.value = __VERSION__
})
</script>

<template>
  <div v-bind="$attrs">
    <v-btn
      icon="mdi-cog-outline"
      variant="text"
      :ripple="false"
      @click="isPanelOpen = !isPanelOpen"
    >
    </v-btn>

    <Teleport to="#app">
      <Transition name="slide-fade">
        <div v-if="isPanelOpen" class="right-sheet">
          <v-sheet v-model="isPanelOpen" width="360px" height="100dvh" elevation="0">
            <v-toolbar flat>
              <v-toolbar-title>{{ $t('general.settings_panel') }}</v-toolbar-title>
              <v-btn icon @click="isPanelOpen = !isPanelOpen">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-container>
              <v-row>
                <!-- 主题 -->
                <v-col cols="12">
                  <v-card
                    flat
                    :title="t('setting.theme.title')"
                    :subtitle="t('setting.theme.subtitle')"
                  >
                    <template v-slot:actions>
                      <v-radio-group
                        v-model="settings.themes.select"
                        v-for="item in settings.themes.theme"
                        :key="item.label"
                      >
                        <v-radio
                          :label="item.label"
                          :value="item.value"
                          :disabled="item.disabled"
                        ></v-radio>
                      </v-radio-group>
                    </template>
                  </v-card>
                </v-col>
                <!-- 杂项 -->
                <v-col cols="12">
                  <v-card flat>
                    <template v-slot:text>
                      <div class="d-flex justify-space-between">
                        <span class="text-grey-darken-1">{{ $t('general.current_release') }}</span>
                        <span class="text-body-1">{{ currentRelease }}</span>
                      </div>
                    </template>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </div>
      </Transition>
      <v-overlay v-model="isPanelOpen"></v-overlay>
    </Teleport>
  </div>
</template>

<style scoped>
.right-sheet {
  user-select: none;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2024;
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
