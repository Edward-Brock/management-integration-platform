<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

const { t } = useI18n()

// 设置面板状态
const isPanelOpen = ref(false)

// 主题选择
const themeRadio = reactive({
  select: 'lightTheme',
  theme: [
    { label: t('setting.theme.light'), value: 'lightTheme', disabled: false },
    { label: t('setting.theme.dark'), value: 'darkTheme', disabled: true }
  ]
})

const theme = useTheme()

watch(themeRadio, (newValue) => {
  theme.global.name.value = newValue.select
})

const currentRelease = ref('')

onMounted(() => {
  currentRelease.value = __VERSION__
})
</script>

<template>
  <div>
    <v-btn
      icon="mdi-cog-outline"
      variant="text"
      :ripple="false"
      @click="isPanelOpen = !isPanelOpen"
    >
    </v-btn>

    <v-overlay style="user-select: none" v-model="isPanelOpen" scroll-strategy="block">
      <v-slide-x-reverse-transition>
        <v-sheet width="360px" height="100dvh" position="fixed" elevation="0">
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
                      v-model="themeRadio.select"
                      v-for="item in themeRadio.theme"
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
      </v-slide-x-reverse-transition>
    </v-overlay>
  </div>
</template>

<style scoped></style>
