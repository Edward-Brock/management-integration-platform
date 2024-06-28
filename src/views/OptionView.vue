<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getOptions, patchOptions } from '@/apis/options'
import { useNotificationStore } from '@/stores/notificationStore'
import { getCountTotalNumberUsers } from '@/apis/manage'
import UserDataTable from '@/components/Tables/UserDataTable.vue'

type TotalNumberUsers = {
  name: string
  number: number
}

type Option = {
  name: string
  value: string
  autoload: boolean
}

const { t } = useI18n()
const notificationStore = useNotificationStore()
const reload: any = inject('reload')
const tab = ref()

const totalNumberUsers = ref<TotalNumberUsers[]>([
  { name: 'ACTIVE', number: 0 },
  { name: 'SUSPENDED', number: 0 },
  { name: 'LOCKED', number: 0 },
  { name: 'INACTIVE', number: 0 },
  { name: 'TOTAL', number: 0 }
])

/**
 * 获取当前全部用户数
 */
async function fetchCountTotalNumberUsers() {
  try {
    const data: any = await getCountTotalNumberUsers()
    totalNumberUsers.value = totalNumberUsers.value.map((item) => {
      const found = data.find((d: any) => d.name === item.name)
      if (found) {
        return { ...item, number: found.number }
      }
      return item
    })
  } catch (error) {
    console.error('Error fetching option info:', error)
  }
}

/**
 * ==============================
 * 网站配置
 * ==============================
 */
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
    department: t('manage.status_selects.active')
  },
  {
    name: 'STOP',
    department: t('manage.status_selects.stop')
  }
]

const _optionInfo = reactive({ ...optionInfo })

// 输入框为空规则检查
const EmptyRules = ref([(v: any) => !!v || t('manage.field_required')])

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
          message: t('general.window.save_success'),
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
  fetchCountTotalNumberUsers()
  fetchOptionInfo()
})
</script>

<template>
  <v-card class="px-4 pt-4" elevation="0">
    <div class="text-h5 mb-4">{{ $t('manage.title') }}</div>
    <v-tabs v-model="tab">
      <v-tab :value="t('manage.user.title')">{{ $t('manage.user.title') }}</v-tab>
      <v-tab :value="t('manage.config.title')">{{ $t('manage.config.title') }}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <!-- 用户管理 -->
        <v-tabs-window-item :value="t('manage.user.title')">
          <v-sheet class="d-flex align-content-space-between flex-wrap">
            <v-card
              v-for="item in totalNumberUsers"
              :key="item.name"
              class="d-flex flex-column align-center justify-between"
              elevation="0"
            >
              <v-card-text>
                <span class="mr-4 text-grey-darken-1">{{
                  $t('manage.user.status.' + item.name.toLowerCase())
                }}</span>
                <span class="text-body-1 font-weight-black text-grey-darken-2">{{
                  item.number
                }}</span>
              </v-card-text>
            </v-card>
          </v-sheet>
          <UserDataTable />
        </v-tabs-window-item>
        <!-- 网站配置 -->
        <v-tabs-window-item :value="t('manage.config.title')">
          <v-sheet class="h-100 my-4 mx-auto d-flex flex-column align-center">
            <v-form class="w-100 d-flex flex-column align-center" ref="form" @submit="validate">
              <v-textarea
                class="mt-8 w-100 w-md-50"
                v-model="optionInfo.service_logo"
                :rules="EmptyRules"
                :label="$t('manage.config.logo')"
                variant="outlined"
                rows="2"
                auto-grow
                required
              ></v-textarea>

              <v-text-field
                class="mt-2 w-100 w-md-50"
                v-model="optionInfo.service_name_full"
                :rules="EmptyRules"
                :label="$t('manage.config.full_name')"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                class="mt-2 w-100 w-md-50"
                v-model="optionInfo.service_name_simple"
                :rules="EmptyRules"
                :label="$t('manage.config.simple_name')"
                variant="outlined"
              ></v-text-field>

              <v-select
                class="mt-2 w-100 w-md-50"
                :items="statusSelects"
                item-title="name"
                :label="$t('manage.config.status')"
                v-model="optionInfo.service_status"
                variant="outlined"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props" :subtitle="item.raw.department"></v-list-item>
                </template>
              </v-select>

              <div class="w-100 w-md-50 d-flex flex-column">
                <v-btn type="submit" class="mt-4" variant="tonal" size="large" block
                  >{{ $t('manage.config.update_option') }}
                </v-btn>
              </div>
            </v-form>
          </v-sheet>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
