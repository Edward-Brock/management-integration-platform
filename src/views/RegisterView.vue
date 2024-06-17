<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const { t } = useI18n()

const form = ref()

const userInfo = reactive({
  username: '', // 用户名
  password: '', // 密码
  confirmPassword: '' // 确认密码
})
const passwordInputShow = ref(false) // 密码字段可见
const confirmPasswordInputShow = ref(false) // 确认密码字段可见

// 用户名字段验证
const UsernameRules = ref([
  (v: any) => !!v || t('validation.usernameRequired'),
  (v: any) => (v && v.length >= 4) || t('validation.usernameLengthMin'),
  (v: any) => (v && v.length <= 20) || t('validation.usernameLengthMax')
])

// 密码字段验证
const PasswordRules = ref([
  (v: any) => !!v || t('validation.passwordRequired'),
  (v: any) => (v && v.length >= 6) || t('validation.passwordLengthMin'),
  (v: any) => (v && v.length <= 36) || t('validation.passwordLengthMax')
])

// 确认密码验证
const ConfirmPasswordRules = ref([
  (v: any) => !!v || t('validation.passwordRequired'),
  (v: any) =>
    (v && userInfo.confirmPassword === userInfo.password) || t('validation.passwordsDoNotMatch')
])

async function validate(e: any) {
  e.preventDefault()
  const { valid } = await form.value.validate()

  if (valid) {
    const { confirmPassword, ...dataToSubmit } = userInfo
    await useUserStore().register(dataToSubmit)
  }
}
</script>

<template>
  <v-sheet class="h-100 mx-auto d-flex flex-column justify-center align-center">
    <h2 class="mb-8">{{ $t('login.register_mip_account') }}</h2>
    <v-form ref="form" @submit="validate">
      <v-text-field
        v-model="userInfo.username"
        :rules="UsernameRules"
        :label="$t('login.username')"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        width="360"
        required
      ></v-text-field>

      <v-text-field
        class="mt-4"
        v-model="userInfo.password"
        :append-inner-icon="passwordInputShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordInputShow ? 'text' : 'password'"
        :rules="PasswordRules"
        :label="$t('login.password')"
        prepend-inner-icon="mdi-form-textbox-password"
        clearable
        variant="outlined"
        width="360"
        @click:append-inner="passwordInputShow = !passwordInputShow"
        required
      ></v-text-field>

      <v-text-field
        class="mt-4"
        v-model="userInfo.confirmPassword"
        :append-inner-icon="confirmPasswordInputShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="confirmPasswordInputShow ? 'text' : 'password'"
        :rules="ConfirmPasswordRules"
        :label="$t('login.confirmPassword')"
        prepend-inner-icon="mdi-form-textbox-password"
        clearable
        variant="outlined"
        width="360"
        @click:append-inner="confirmPasswordInputShow = !confirmPasswordInputShow"
        required
      ></v-text-field>

      <div class="d-flex flex-column">
        <v-btn type="submit" class="mt-4" variant="tonal" size="large" block
          >{{ $t('user.register') }}
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped></style>

<style scoped></style>
