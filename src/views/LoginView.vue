<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const { t } = useI18n()

const form = ref()

const userInfo = reactive({
  username: '',
  password: ''
})
const passwordInputShow = ref(false)

/**
 * 用户名验证
 */
const UsernameRules = ref([
  (v: any) => !!v || t('validation.usernameRequired'),
  (v: any) => (v && v.length >= 4) || t('validation.usernameLengthMin'),
  (v: any) => (v && v.length <= 20) || t('validation.usernameLengthMax')
])

const PasswordRules = ref([
  (v: any) => !!v || t('validation.passwordRequired'),
  (v: any) => (v && v.length >= 6) || t('validation.passwordLengthMin'),
  (v: any) => (v && v.length <= 36) || t('validation.passwordLengthMax')
])

async function validate() {
  const { valid } = await form.value.validate()

  if (valid) {
    await useUserStore().login(userInfo)
    router.push('/')
  }
}
</script>

<template>
  <v-sheet
    class="h-100 mx-auto d-flex flex-column justify-center align-center"
    style="user-select: none"
  >
    <h2 class="mb-8">{{ $t('login.sign_in_to_your_account') }}</h2>
    <v-form ref="form">
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
        variant="outlined"
        width="360"
        @click:append-inner="passwordInputShow = !passwordInputShow"
        required
      ></v-text-field>

      <div class="d-flex flex-column">
        <v-btn class="mt-4" variant="tonal" size="large" block @click="validate"
          >{{ $t('user.signIn') }}
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped></style>
