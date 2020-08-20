// 使用该文件用过 "/// <reference path="global.d.ts" />" 引入global声明后使用global.util.<function>来调用

export const formatTime = (date: Date, format: String) => {
  const year = date.getFullYear()
    , month = date.getMonth() + 1
    , day = date.getDate()
    , hour = date.getHours()
    , minute = date.getMinutes()
    , second = date.getSeconds()

  return format.replace(/yy|yyyy|mm|dd|hh|ss/gi, a => {
    switch (a) {
      case 'YY': case 'yy': return fnum(~~(year % 100))
      case 'YYYY': case 'yyyy': return fnum(year)
      case 'MM': return fnum(month)
      case 'mm': return fnum(minute)
      case 'DD': case 'dd': return fnum(day)
      case 'HH': case 'hh': return fnum(hour)
      case 'SS': case 'ss': return fnum(second)
      default: return ''
    }
  })
}

const fnum = (n: number | string) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function useStorage(
  context: any,
  { key, propKey, defaultValue }: useStorageOption,
  callback?: (value: any) => void
): any {
  let _value = wx.getStorageSync(key)
  const setter = (data: any) => {
    wx.setStorageSync(key, data)
    return data
  }
  Object.defineProperty(context, propKey || key, {
    get: () => _value,
    set: (value: any) => {
      _value = setter(value)
      if (callback) callback(value)
    },
    enumerable: true,
    configurable: true
  })
  return _value === '' && defaultValue !== void 0
    ? setter(defaultValue)
    : _value
}

const pxRatio = 750 / global.systemInfo.screenWidth

export const px2rpx = (px: number) => ~~(px * pxRatio)

export const rpx2px = (rpx: number) => ~~(rpx / pxRatio)

export const getRandomColor = () => `#${[0, 0, 0].map(() => (~~(Math.random() * 0x100)).toString(16).replace(/^(\w)$/, `0$1`)).join(``)}`

export function createInnerAudioContext(options: InnerAudioContextOptions) {
  const context = wx.createInnerAudioContext()
  for (let item in options) {
    const prop = options[item]
    if (typeof prop === 'function') {
      context[item](prop)
    } else {
      context[item] = prop
    }
  }
  return context
}
