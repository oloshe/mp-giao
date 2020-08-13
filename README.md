# mp-giao
> **mp-giao** giao 就完事了
## 小程序 Typescript 快速启动项目

如果你想在小程序使用 Typescript 又不想应付麻烦的配置，clone 这个项目，给你开箱即用的体验。

> 使用了相关工具：
> - [Gulp](https://www.gulpjs.com.cn/)： 为了避免一个文件夹出现n个文件(.js, .ts, .json, .wxml, wxss, .less, .scss等)，使用gulp构建分离src代码和dist代码
> - [Less](http://lesscss.cn/) / [Sass](https://www.sass.hk/)： 嵌套式写法，让结构一目了然，让你的样式层叠表更加强大 *（选择其中一个使用即可）*
> - [ESLint](http://eslint.cn/)： 规范团队代码
> - [ColorUI](https://github.com/weilanwl/ColorUI)： 高颜值的样式库

### 安装教程

1. `npm install // 安装依赖`
2. `npm run build // 构建`

启动微信web开发者工具导入项目即可

### 命令

1. `npm run dev // 监听变化重新构建`
2. `npm run lint // 使用ESLint检查代码风格`

## 自定义代码片段
> 为了加快开发和提供便捷，使用自定义文件夹代码片段文件
### 代码片段 - Page
快速构造 Page

**触发关键词**： `giaop`
#### 代码片段 
> 小程序的页面也可以视为自定义组件。因而，页面也可以使用 Component 构造器构造
> 
> [参考微信官方文档：Component 构造器](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)

```Typescript
export {}

interface IData {
    
}

interface IMethod extends WechatMiniprogram.Component.MethodOption {
    
}

Component<IData, {}, IMethod>({

    behaviors: [],

    data: {},

    methods: {
        onLoad(options: any) {
            
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

### 代码片段 - Component
快速构造 Component

**触发关键词**： `giaoc`
#### 代码片段 
```Typescript
export {}

interface IData {
    
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