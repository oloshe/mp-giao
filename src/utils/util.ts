
/// <reference path="../../global.d.ts" />
const app = getApp<IAppOption>()

/**
 * @param date 
 * @param format 格式 YY-MM-DD hh:mm:ss
 */
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

interface useStorageOption {
  /**
   * storage键值
   */
  key: string
  /**
   * 挂载在context上的属性名
   */
  propertyName?: string
  /**
   * 当storage取值为""时的默认值
   */
  defaultValue?: any
}

/**
 * 使用本地存储钩子函数
 * @param context 影响的上下文
 * @param key 本地存储中的键值
 * @param callback 赋值时的回调函数（副作用）
 * @example 
 * // 在页面 onLoad 中调用
 * useStorage(this, { key: 'name' }, name => this.setData({ name }))
 * // 调用完之后 this.name = [本地存储的name]
 * // 由于上面注册了副作用会自动setData，故无须重复setData
 * this.name = '小阿giao'
 * 
 * useStorage(this.data, {
 *  key: 'temp',
 *  propertyName: '_temp'
 * }) 
 * // 调用完之后 this.data._temp = [本地存储的temp]
 * // 赋值之后会自动更新Storage里的值
 * 
 * // 注意！！ 挂载在page.data上的数据，副作用不要进行setData的操作，否则会陷入死循环
 * // 因为setData会自动给page.data上的值赋值
 */
export function useStorage(
  context: any,
  { key, propertyName, defaultValue }: useStorageOption,
  callback?: (value: any) => void
): any {
  let _value = wx.getStorageSync(key)
  const setter = (data: any) => {
    wx.setStorageSync(key, data)
    return data
  }
  Object.defineProperty(context, propertyName || key, {
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

/**
 * 选择器
 * @param context 上下文 传this
 * @param isAll 是否选择所有
 */
export function $(context: WechatMiniprogram.Component.Instance<{}, {}, {}>, isAll: boolean) {
  /** 
   * @param selector 选择器
   */
  return function (selector: string) {
    const query = context.createSelectorQuery()
    return isAll ? query.selectAll(selector) : query.select(selector)
  }
}

/**
 * 日志管理器对象
 */
export const log = wx.getLogManager({})
/**
 * 不会把 App、Page 的生命周期函数和 wx 命名空间下的函数调用写入日志
 */
export const log1 = wx.getLogManager({ level: 1 })
/**
 * 实时日志管理器对象
 */
export const rlog = wx.getRealtimeLogManager()

/**
 * px 和 rpx 转化的比例
 */
export const pxRatio = 750 / app.systemInfo.screenWidth

/**
 * px转换成rpx
 * @param px
 */
export const px2rpx = (px: number) => ~~(px * pxRatio)

/**
 * rpx转换成px
 * @param rpx
 */
export const rpx2px = (rpx: number) => ~~(rpx / pxRatio)

/**
 * 生成随机16进制颜色
 */
export const getRandomColor = () => `#${[0, 0, 0].map(() => (~~(Math.random() * 0x100)).toString(16).replace(/^(\w)$/, `0$1`)).join(``)}`

