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
    register_mip_account: 'Register MIP account',
    register_account_linked: "Don't have an account yet? {action}",
    sign_in_to_your_account: '@:user.signIn to MIP account',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm @:login.password'
  },
  validation: {
    passwordsDoNotMatch: 'Passwords do not match',
    usernameRequired: 'Username is required',
    NicknameRequired: 'Nickname is required',
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
    update_profile: 'Update @:user.profile',
    profile: 'Profile',
    prefix_profile: 'Your @:user.profile',
    settings: 'Settings',
    name: 'Nickname',
    email: 'Email',
    mobile: 'Mobile',
    upload_avatar: 'Upload Avatar',
    preview_avatar: 'Preview Avatar',
    change_avatar: 'Click to change avatar',
    website_option: 'Website Option'
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
    window: {
      cancel: 'Cancel',
      ok: 'Ok',
      save: 'Save',
      choose_avatar: 'Choose your avatar',
      upload: 'Upload',
      save_success: 'Save success'
    },
    theme: {
      title: 'Theme',
      subtitle: 'Customize the current website using a light or dark theme',
      light: 'Light',
      dark: 'Dark'
    },
    language: {
      title: 'Language',
      autoDetection: 'Automatic Detection',
      zhCN: 'Chinese (Simplified)',
      enUS: 'English'
    }
  },
  manage: {
    title: 'Website Manage',
    config: {
      title: 'Website Option',
      update_option: 'Update Website Option',
      field_required: 'Required Field',
      logo: 'Website Logo',
      full_name: 'Website Full Name',
      simple_name: 'Website Simple Name',
      status: 'Website Status',
      status_selects: {
        active: 'Service is running normally',
        stop: 'Service needs to be suspended'
      }
    },
    user: {
      title: 'User Manage',
      status: {
        active: 'ACTIVE',
        suspended: 'SUSPENDED',
        locked: 'LOCKED',
        inactive: 'INACTIVE',
        total: 'TOTAL USER'
      }
    }
  },
  // 展开 Vuetify 英文语言包所有项目
  ...en
}
