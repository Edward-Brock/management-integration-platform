<script setup lang="ts">
import { computed, inject, nextTick, ref, watch } from 'vue'
import { deleteUser, getAllUsers, patchUserProfile } from '@/apis/users'
import { useI18n } from 'vue-i18n'
import { useNotificationStore } from '@/stores/notificationStore'
import { getCosObjectUrl } from '@/utils/cos'

type UserInfo = {
  id: string
  name: string
  username: string
  avatar: string
  email: string
  mobile: string
  status: string
  createdAt: string
  updatedAt: string
}

const { t } = useI18n()
const notificationStore = useNotificationStore()
const reload: any = inject('reload')

let userList: any = ref([])
userList.value = await getAllUsers()
userList.value.map((user: UserInfo) => {
  getCosObjectUrl(user.avatar)
    .then((url) => {
      if (typeof url === 'string') {
        user.avatar = url
      }
    })
    .catch((error) => {
      console.error('Error getting object URL:', error)
    })
})

const dialog = ref(false)
const dialogDelete = ref(false)
const search = ref('')

const headers = ref([
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'NAME' },
  { key: 'username', title: 'USERNAME' },
  { key: 'email', title: 'EMAIL' },
  { key: 'mobile', title: 'MOBILE' },
  { key: 'avatar', title: 'AVATAR', sortable: false },
  { key: 'roles', title: 'ROLES' },
  { key: 'status', title: 'STATUS' },
  { key: 'createdAt', title: 'CREATE TIME' },
  { key: 'updatedAt', title: 'UPDATE TIME' },
  { key: 'actions', title: 'Actions', sortable: false }
])
const editedIndex = ref(-1)
const editedItem: any = ref({
  name: '',
  username: '',
  email: '',
  mobile: '',
  status: ''
})
const defaultItem: any = ref({
  name: '',
  username: '',
  email: '',
  mobile: '',
  status: '',
  role: []
})

const formTitle = computed(() => {
  return editedIndex.value === -1 ? t('manage.user.new_item') : t('manage.user.edit_item')
})

function editItem(item: any) {
  editedIndex.value = userList.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

function deleteItem(item: any) {
  editedIndex.value = userList.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

function deleteItemConfirm() {
  const data: object = deleteUser(userList.value[editedIndex.value].id)
  if (data) {
    notificationStore.addNotification({
      message: '用户删除成功',
      type: 'success'
    })
    closeDelete()
    reload()
  }
}

function close() {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}

function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}

async function save() {
  const updatedFields: any = {}
  const originalItem = userList.value[editedIndex.value]

  Object.keys(editedItem.value).forEach((key) => {
    if (editedItem.value[key] !== originalItem[key]) {
      updatedFields[key] = editedItem.value[key]
    }
  })
  if (editedIndex.value > -1) {
    if (Object.keys(updatedFields).length > 0) {
      await patchUserProfile(editedItem.value.id, updatedFields)
    }
    Object.assign(userList.value[editedIndex.value], editedItem.value)
  } else {
    userList.value.push(editedItem.value)
  }
  close()
}

watch(dialog, (val) => {
  val || close()
})

watch(dialogDelete, (val) => {
  val || closeDelete()
})
</script>

<template>
  <v-card flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <!-- 数据表格 -->
    <v-data-table :headers="headers" :items="userList" v-model:search="search" items-per-page="10">
      <template v-slot:item.avatar="{ item }">
        <v-card class="my-2" elevation="0">
          <v-img class="rounded-circle" :src="item.avatar" height="64" width="64" cover></v-img>
        </v-card>
      </template>

      <template v-slot:item.roles="{ item }">
        <span>{{ item.roles.map((role: any) => role.role.name).join(' ') }}</span>
      </template>

      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card :title="formTitle">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.name" label="账户名称"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.username" label="昵称"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.email" label="电子邮箱"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.mobile" label="联系电话"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="账号状态"
                      v-model="editedItem.status"
                      :items="['ACTIVE', 'SUSPENDED', 'LOCKED', 'INACTIVE']"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">{{
                $t('general.window.cancel')
              }}</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">{{
                $t('general.window.save')
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card title="Are you sure you want to delete this item?">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">{{
                $t('general.window.cancel')
              }}</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">{{
                $t('general.window.ok')
              }}</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="search = ''">Reset</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped></style>
