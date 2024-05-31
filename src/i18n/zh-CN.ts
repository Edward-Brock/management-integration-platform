import { zhHans } from 'vuetify/locale'

export default {
  general: {
    dashboard: '仪表盘',
    about: '关于'
  },
  login: {
    sign_in_to_your_account: '登录你的账户',
    username: '用户名',
    password: '密码'
  },
  validation: {
    usernameRequired: '需要用户名',
    usernameLengthMin: '用户名需大于 4 个字符',
    usernameLengthMax: '用户名需小于 20 个字符',
    passwordRequired: '需要密码',
    passwordLengthMin: '密码需大于 6 个字符',
    passwordLengthMax: '密码需小于 36 个字符'
  },
  user: {
    register: '注册',
    signIn: '登录',
    signOut: '登出',
    profile: '个人信息',
    settings: '设置'
  },
  earlyMorning: {
    earlyMorning: '早上好',
    morning: '上午好',
    noon: '中午好',
    afternoon: '下午好',
    evening: '傍晚好',
    night: '晚上好',
    lateNight: '深夜好'
  },
  // 展开 Vuetify 简体中文语言包所有项目
  ...zhHans
}
