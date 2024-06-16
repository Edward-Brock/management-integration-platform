<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getOptions, patchOptions } from '@/apis/options'
import { useNotificationStore } from '@/stores/notificationStore'

type Option = {
  name: string
  value: string
  autoload: boolean
}

const { t } = useI18n()
const notificationStore = useNotificationStore()
const reload: any = inject('reload')

const form = ref()
const optionInfo = reactive({
  service_logo: '',
  service_name_full: '',
  service_name_simple: '',
  service_status: ''
})

// 服务状态选择相
const statusSelects = [
  {
    name: 'ACTIVE',
    department: t('option.status_selects.active')
  },
  {
    name: 'STOP',
    department: t('option.status_selects.stop')
  }
]

const _optionInfo = reactive({ ...optionInfo })

// 输入框为空规则检查
const EmptyRules = ref([(v: any) => !!v || t('option.field_required')])

async function validate(e: any) {
  e.preventDefault()
  const { valid } = await form.value.validate()

  if (valid) {
    // 验证通过后调用更新网站配置方法
    await updateOptionInfo()
  }
}

/**
 * 获取网站配置全部数据
 */
async function fetchOptionInfo() {
  try {
    const data: { name: string; value: string; autoload: boolean }[] =
      (await getOptions()) as Option[]
    const formattedData = data.reduce((acc: any, item: any) => {
      switch (item.name) {
        case 'service_logo':
          acc.service_logo = item.value
          break
        case 'service_name_full':
          acc.service_name_full = item.value
          break
        case 'service_name_simple':
          acc.service_name_simple = item.value
          break
        case 'service_status':
          acc.service_status = item.value
          break
      }
      return acc
    }, {})
    Object.assign(_optionInfo, formattedData)
    Object.assign(optionInfo, formattedData)
  } catch (error) {
    console.error('Error fetching option info:', error)
  }
}

/**
 * 更新网站配置信息
 */
async function updateOptionInfo() {
  try {
    const changes: Partial<typeof optionInfo> & Record<string, any> = {}
    // 循环获取已被修改的字段
    for (const key in optionInfo) {
      if (
        optionInfo[key as keyof typeof optionInfo] !== _optionInfo[key as keyof typeof _optionInfo]
      ) {
        changes[key as keyof typeof optionInfo] = optionInfo[key as keyof typeof optionInfo]
      }
    }

    if (Object.keys(changes).length > 0) {
      // 更新选项
      const updatePromises = Object.entries(changes).map(([name, value]) =>
        patchOptions(name, { value: value })
      )

      if (updatePromises.length > 0) {
        await Promise.all(updatePromises)
        // 保存成功提示
        notificationStore.addNotification({
          message: t('setting.window.save_success'),
          type: 'success'
        })
        // 刷新页面
        reload()
      }
    }
  } catch (error) {
    console.error('Error updating option info:', error)
  }
}

onMounted(() => {
  fetchOptionInfo()
})
</script>

<template>
  <v-sheet
    class="h-100 w-75 pa-10 mt-4 mx-auto d-flex flex-column align-center"
    rounded
    style="user-select: none"
  >
    <h2 class="mb-8">{{ $t('option.title') }}</h2>
    <v-form class="d-flex flex-column align-center" ref="form" @submit="validate">
      <v-textarea
        class="mt-8"
        v-model="optionInfo.service_logo"
        :rules="EmptyRules"
        :label="$t('option.logo')"
        variant="outlined"
        width="360"
        rows="2"
        auto-grow
        required
      ></v-textarea>

      <v-text-field
        class="mt-2"
        v-model="optionInfo.service_name_full"
        :rules="EmptyRules"
        :label="$t('option.full_name')"
        variant="outlined"
        width="360"
      ></v-text-field>

      <v-text-field
        class="mt-2"
        v-model="optionInfo.service_name_simple"
        :rules="EmptyRules"
        :label="$t('option.simple_name')"
        variant="outlined"
        width="360"
      ></v-text-field>

      <v-select
        class="mt-2"
        :items="statusSelects"
        item-title="name"
        :label="$t('option.status')"
        v-model="optionInfo.service_status"
        variant="outlined"
        width="360"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :subtitle="item.raw.department"></v-list-item>
        </template>
      </v-select>

      <div class="w-100 d-flex flex-column">
        <v-btn type="submit" class="mt-4" variant="tonal" size="large" block
          >{{ $t('option.update_option') }}
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped></style>
