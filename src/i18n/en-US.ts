import { en } from 'vuetify/locale'

export default {
  general: {
    dashboard: 'Dashboard',
    about: 'About',
    settings_panel: 'Settings Panel',
    current_release: 'Current release'
  },
  login: {
    register_account: 'Register account',
    register_mip_account: 'Register mip account',
    register_account_linked: "Don't have an account yet? {action}",
    sign_in_to_your_account: '@:user.signIn to MIP account',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm @login.password'
  },
  validation: {
    passwordsDoNotMatch: 'Passwords do not match',
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
  earlyMorning: {
    earlyMorning: 'Good morning',
    morning: 'Good morning',
    noon: 'Good noon',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    night: 'Good evening',
    lateNight: 'Good late at night'
  },
  setting: {
    theme: {
      title: 'Theme',
      subtitle: 'Customize the current website using a light or dark theme',
      light: 'Light',
      dark: 'Dark'
    }
  },
  // 展开 Vuetify 英文语言包所有项目
  ...en
}
