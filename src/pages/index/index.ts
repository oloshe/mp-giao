/// <reference path="../../../global.d.ts" />
export { }
// 获取应用实例
const app = getApp<IAppOption>()

export {}

interface IData {
  title: string
  desc: string
  intro: string,
  statusBarHeight: number
  hasUserInfo: boolean
  canIUse: boolean
  intros: Array<{
    name: string,
    path: string,
    animate?: boolean,
  }>,
  hot:boolean
}

interface IMethod extends WechatMiniprogram.Component.MethodOption {
  
}

Component<IData, {}, IMethod>({

  behaviors: [],

  data: {
    title: 'mp-giao',
    intro: '使用 Typescript 的小程序项目',
    desc: '如果你想在小程序使用 Typescript 又不想应付麻烦的配置，clone 这个项目，给你开箱即用的体验。',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    statusBarHeight: app.systemInfo.statusBarHeight,
    intros: [
      {
        name: 'utils - demo',
        path: '/pages/utils-demo/index',
      },
    ],
    hot: false,
  },

  methods: {
    onLoad() {
      
    },
    animate(e: any) {
      const { index } = e.currentTarget.dataset
      this.setData({
        [`intros[${index}].animate`]: true,
        hot: true,
      })
    },
    animationEnd(e) {
      const { index } = e.currentTarget.dataset
      wx.navigateTo({
        url: this.data.intros[index].path,
        complete: () => {
          setTimeout(() => {
            this.setData({
              [`intros[${index}].animate`]: false,
              hot: false,
            })
          }, 1000)
        }
      })
    }
  }
})
