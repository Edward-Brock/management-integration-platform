export default {
  general: {
    dashboard: '仪表盘',
    about: '关于',
    settings_panel: '设置面板',
    current_release: '当前版本',
    window: {
      cancel: '取消',
      ok: '好',
      save: '保存',
      delete: '删除',
      upload: '上传',
      save_success: '保存成功',
      delete_success: '删除成功'
    }
  },
  login: {
    register_account: '注册账户',
    register_mip_account: '注册 MIP 账户',
    register_account_linked: '还没有账户？{action}',
    sign_in_to_your_account: '@:user.signIn MIP 账户',
    username: '用户名',
    password: '密码',
    confirmPassword: '确认密码'
  },
  validation: {
    passwordsDoNotMatch: '密码不匹配',
    usernameRequired: '需要用户名',
    NicknameRequired: '需要昵称',
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
    update_profile: '更新@:user.profile',
    profile: '个人信息',
    prefix_profile: '你的@:user.profile',
    settings: '设置',
    name: '昵称',
    email: '电子邮箱',
    mobile: '手机号码',
    upload_avatar: '上传头像',
    choose_avatar: '选择你的头像',
    preview_avatar: '预览头像',
    change_avatar: '点击更改头像',
    website_option: '网站配置'
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
  timeline: {
    placeholder: '你想记录些什么？',
    submit: '记录',
    review: '回顾',
    timelineRequired: '需要填写时间线内容'
  },
  setting: {
    theme: {
      title: '主题',
      subtitle: '自定义当前网站使用明亮或黑暗主题',
      light: '浅色主题',
      dark: '黑暗主题'
    },
    language: {
      title: '语言',
      autoDetection: '自动检测',
      zhCN: '简体中文',
      enUS: '英文'
    }
  },
  manage: {
    title: '网站管理',
    config: {
      title: '网站配置',
      update_option: '更新网站配置',
      field_required: '需要字段',
      logo: '网站标识',
      full_name: '网站全称',
      simple_name: '网站简称',
      status: '网站服务状态',
      status_selects: {
        active: '服务正常运行',
        stop: '服务需要暂停服务'
      }
    },
    user: {
      title: '用户管理',
      status: {
        active: '活跃用户',
        suspended: '停用用户',
        locked: '锁定用户',
        inactive: '删除用户',
        total: '总用户数'
      },
      new_item: '新增用户',
      edit_item: '修改用户'
    }
  }
}
