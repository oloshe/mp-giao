// 在这里定义小程序全局会使用到的类型

declare interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
  }
  systemInfo: WechatMiniprogram.GetSystemInfoSyncResult
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
