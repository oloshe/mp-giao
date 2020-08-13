
import '../../global'
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

const fnum = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

interface useStorageOption {
  key: string
  propertyName?: string
}

/**
 * 使用本地存储钩子函数
 * @param context 影响的上下文
 * @param key 本地存储中的键值
 * @param callback 赋值时的回调函数（副作用）
 * @example 
 * // 在页面 onLoad 中调用
 * useStorage(this, { key: 'name' }, name => this.setData!({ name }))
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
 */
export function useStorage(
  context: any,
  { key, propertyName }: useStorageOption,
  callback?: (value: any) => void
): void {
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
}

/**
 * 选择器
 * @param selector 选择器
 * @param context 上下文 传this
 * @param isAll 是否使用selectAll
 * @example
 * $('#dialog', this).boundingClientRect().exec(function (res) => {
 * ......
 * })
 */
export function $(selector: string, context: WechatMiniprogram.Component.Instance<{}, {}, {}>, isAll?: boolean) {
  const query = context.createSelectorQuery()
  return isAll ? query.selectAll(selector) : query.select(selector)
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
