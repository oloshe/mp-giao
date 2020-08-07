# mp-giao
> **mp-giao** giao 就完事了
## 小程序 Typescript + Less 快速启动项目

> 使用 **Gulp** + **ESLint** 协助开发

### 安装教程

1. `npm install // 安装依赖`
2. `npm run build // 构建`

启动微信web开发者工具导入项目即可

### 命令

1. `npm run dev // 监听变化重新构建`
2. `npm run lint // 使用ESLint检查代码风格`

## 自定义代码片段
> 为了加快开发和提供便捷，使用自定义文件夹代码片段文件
### Page
**触发关键词**： `giaop`
#### 代码片段 
> 小程序的页面也可以视为自定义组件。因而，页面也可以使用 Component 构造器构造
> 
> [参考微信官方文档：Component 构造器](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)

```Typescript
export {}

interface IData extends WechatMiniprogram.Component.DataOption {
  
}

interface IMethod extends WechatMiniprogram.Component.MethodOption {
  
}

Component<IData, {}, IMethod>({

  behaviors: [],

  data: {},

  methods: {
    onLoad(options: Record<string, string | undefined>) {
      
    },

    onUnload() {
      
    },

    onReady() {
      
    },

    onShow() {
      
    },

    onHide() {
      
    },

    onPullDownRefresh() {
      
    },

    onReachBottom() {
      
    },

    onShareAppMessage(res: WechatMiniprogram.Page.IShareAppMessageOption) {
      
    },

    onPageScroll(res: WechatMiniprogram.Page.IPageScrollOption) {
      
    },

    onResize(res: WechatMiniprogram.Page.IResizeOption) {
      
    },
  }
})

```

### Component
**触发关键词**： `giaoc`
#### 代码片段 
```Typescript
export {}

interface IData extends WechatMiniprogram.Component.DataOption {
  
}

interface IProperty extends WechatMiniprogram.Component.PropertyOption{
  
}

interface IMethod extends WechatMiniprogram.Component.MethodOption {
  
}

Component<IData, IProperty, IMethod>({

  behaviors: [],

  properties: {},

  data: {},

  // 组件生命周期
  lifetimes: {
    attached() {
      
    },

    move() {
      
    },

    detached() {
      
    },
  },

  // 组件所在页面的生命周期函数
  pageLifetimes: {
    show() {
      
    },

    hide() {
      
    },

    resize() {
      
    },
  },

  methods: {
    
  }

})

```