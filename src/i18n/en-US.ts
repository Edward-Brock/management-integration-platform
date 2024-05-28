import { en } from 'vuetify/locale'

export default {
  general: {
    dashboard: 'Dashboard',
    about: 'About'
  },
  login: {
    sign_in_to_your_account: 'Sign in to your account',
    username: 'Username',
    password: 'Password'
  },
  validation: {
    usernameRequired: 'Username is required',
    usernameLengthMin: 'Username must be more than 4 characters',
    usernameLengthMax: 'Username must be less than 20 characters',
    passwordRequired: 'Password is required',
    passwordLengthMin: 'Password must be more than 6 characters',
    passwordLengthMax: 'Password must be less than 36 characters'
  },
  user: {
    register: 'Register',
    signIn: 'Login',
    signOut: 'Sign Out',
    profile: 'Profile',
    settings: 'Settings'
  },
  // 展开 Vuetify 英文语言包所有项目
  ...en
}
