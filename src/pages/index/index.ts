/// <reference path="../../../global.d.ts" />

export { }
// 获取应用实例
const app = getApp<IAppOption>()

export {}

interface IData {
  title: string
  desc: string
  intro: string,
  systemInfo: WechatMiniprogram.GetSystemInfoSyncResult
  intros: Array<{
    name: string,
    path: string,
    animate?: boolean,
  }>,
  hot:boolean
  github: string,
  gitee: string,
}

interface IMethod extends WechatMiniprogram.Component.MethodOption {
  
}

Component<IData, {}, IMethod>({

  behaviors: [],

  data: {
    title: 'mp-giao',
    intro: '使用 Typescript 的小程序项目',
    desc: '如果你想创建一个小程序项目又不想应付麻烦的配置，clone 这个项目，给你开箱即用的体验。',
    systemInfo: app.systemInfo,
    intros: [
      {
        name: 'utils - demo',
        path: '/pages/utils-demo/index',
      },
    ],
    hot: false,
    github: 'https://github.com/oloshe/mp-giao',
    gitee: 'https://gitee.com/oloshe/mp-giao',
  },

  methods: {
    onLoad() {
      let hours = new Date().getHours()
      , timeList = [19, 17, 13, 12, 6, 0]
      , strList = ['晚上', '傍晚', '下午', '中午', '早上', '凌晨']
      for(let i = 0; i < timeList.length; i++) {
        if (hours >= timeList[i]) {
          return this.setData({
            time: strList[i]
          })
        }
      }
    },
    animate(e: any) {
      const { index } = e.currentTarget.dataset
      ;(this as any).nav = true
      this.setData({
        [`intros[${index}].animate`]: true,
        hot: true,
      })
    },
    animationEnd(e) {
      const { index } = e.currentTarget.dataset
      if (!this.nav) return
      wx.navigateTo({
        url: this.data.intros[index].path,
        complete: () => {
          ;(this as any).nav = false
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
