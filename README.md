# 💊 mp-giao

## 🚀 微信小程序快速启动项目

> **giao 就完事了**

## **🍌 为什么要使用 mp-giao？**

- 为小程序添加typescript支持。官方的TS快速启动项目新建之后只有 tsc 编译，使用起来非常不方便
- 为小程序添加css预处理器，原生的 wxss 功能简单，使用 Less / Sass 加快开发速度，增加样式代码可维护性和复用性
- 分离源码（src）和打包后（dist）的代码，让代码目录结构简单明了
- 在原生开发中，只要文件发生改变之后，不论你是否期望小程序重新编译，它都会自动编译。使用 `npm run dev` 命令开启监听文件变化自动构建，比较修改前后的代码，若没有发生变化则不用重新编译，这是原生开发不能做到的

**如果你即将要开发一个小程序，放下你的犹豫， clone 这个项目，给你开箱即用的体验。**

> 使用了以下库帮助开发：
>
> - [Gulp](https://www.gulpjs.com.cn/)： 为了避免一个文件夹出现n个文件(.js, .ts, .json, .wxml, wxss, .less, .scss等)，使用gulp构建分离src代码和dist代码
> - [Less](http://lesscss.cn/) / [Sass](https://www.sass.hk/)： 嵌套式写法，让结构一目了然，让你的样式层叠表更加强大 *（选择其中一个使用即可，默认使用 Less）*
> - [ESLint](http://eslint.cn/)： 规范团队代码
> - [ColorUI](https://github.com/weilanwl/ColorUI)： 高颜值的样式库

## 🎈 安装步骤

```cmd
# 安装项目依赖
npm install

# 构建
npm run build
````

启动开发者工具导入项目预览即可

### 开发命令

```cmd
# 开启监听自动构建
npm run dev

# 使用ESLint检查代码风格
npm run lint
```

## 🦄 自定义代码片段

> 为了加快开发和提供便捷，使用自定义文件夹代码片段文件

### 代码片段 - Page

> 文件路径：`.vscode/Page.code-snippets`
>
> **触发关键词**： `giaop`
>
> 小程序的页面也可以视为自定义组件。因而，页面也可以使用 Component 构造器构造
>
> [参考微信官方文档：Component 构造器](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)

### 代码片段 - Component

> 文件路径： `.vscode/Component.code-snippets`
>
> **触发关键词**： `giaoc`

## 📣 声明

- 本项目基于 MIT 协议，请自由地享受和参与开源。
- 有疑问欢迎 [**提issue**](https://github.com/oloshe/mp-giao/issues)， 我会尽量fix；
