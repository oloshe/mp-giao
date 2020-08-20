// 在这里定义小程序全局会使用到的类型

declare interface IAppOption {
  globalData: {}
}

interface useStorageOption {
  /**
   * storage键值
   */
  key: string;
  /**
   * 挂载在context上的属性名
   */
  propKey?: string;
  /**
   * 当storage取值为""时的默认值
   */
  defaultValue?: any;
}

declare const global: {
  
  /** 系统信息 */
  systemInfo: WechatMiniprogram.GetSystemInfoSyncResult

  util: {
    /**
     * 格式化时间
     * @param date 
     * @param format 格式 YY-MM-DD hh:mm:ss
     */
    formatTime: (date: Date, format: String) => string

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
     *  propKey: '_temp'
     * }) 
     * // 调用完之后 this.data._temp = [本地存储的temp]
     * // 赋值之后会自动更新Storage里的值
     * 
     * // 注意！！ 挂载在page.data上的数据，副作用不要进行setData的操作，否则会陷入死循环
     * // 因为setData会自动给page.data上的值赋值
     */
    useStorage(context: any, { key, propKey, defaultValue }: useStorageOption, callback?: (value: any) => void): any

    /**
     * px转换成rpx
     * @param px
     */
    px2rpx: (px: number) => number

    /**
     * rpx转换成px
     * @param rpx
     */
    rpx2px: (rpx: number) => number

    /**
     * 生成随机16进制颜色
     */
    getRandomColor: () => string

    /**
     * 创建InnerAudioContext的快捷方法，根据InnerAudioContextOptions的参数给对象快速添加属性和注册回调函数
     * @param options 
     */
    createInnerAudioContext(options: InnerAudioContextOptions): WechatMiniprogram.InnerAudioContext
  }

  cloud: {
    /** 生产环境 */
    ENV_PRODUCTION: string
    /** 开发环境 */
    ENV_DEVELOPMENT: string
    /**
     * 调用云函数
     * @param model 模块名
     * @param func 子模块
     * @param data 携带数据
     * @example
     * // 【用户】模块下的【签到】功能
     * callFunction('user', 'sign', {})
     *  .then(data => {
     *    // 成功回调
     *  })
     *  .catch(-1, data => {
     *    // 错误码为-1时的处理
     *  })
     *  .catch(-2, data => {
     *    // 错误码为-2时的处理
     *  })
     *  .catchDefault(data => {
     *      错误码为其他的时候
     *  })
     */
    callFunction: <T, DataType>(model: string, func: string, data?: DataType) => CloudScheme<T>
    /**
     * 获取数据库文档
     * @param collection 集合
     * @param docId 文档id
     * @param onSuccess 成功回调
     */
    getDocument: <T>(collection: string, docId: string, onSuccess: (data: T) => void) => void
    /* 模块 */
    MODEL: {
    }
    /** 方法 */
    FUNC: {
    }
  }

  /**
   * 日志管理器对象
   */
  log: WechatMiniprogram.LogManager
  
  /**
   * 日志管理器对象
   * 不会把 App、Page 的生命周期函数和 wx 命名空间下的函数调用写入日志
   */
  log1: WechatMiniprogram.LogManager

  /**
   * 实时日志管理器对象
   */
  rlog: WechatMiniprogram.RealtimeLogManager

}

interface InnerAudioContextOptions {
  /** 音频资源的地址，用于直接播放。 */
  src: string;
  /** 是否自动开始播放，默认为 `false` */
  autoplay?: boolean;
  /** 是否循环播放，默认为 `false` */
  loop?: boolean;
  /** 开始播放的位置（单位：s），默认为 0 */
  startTime?: number;
  /** 音量。范围 0~1。默认为 1 */
  volume?: number;
  /** 监听音频进入可以播放状态的事件。但不保证后面可以流畅播放 */
  onCanplay?(
  /** 音频进入可以播放状态的事件的回调函数 */
  callback: WechatMiniprogram.OnCanplayCallback): void;
  /** 监听音频自然播放至结束的事件 */
  onEnded?(
  /** 音频自然播放至结束的事件的回调函数 */
  callback: WechatMiniprogram.OnEndedCallback): void;
  /** 监听音频播放错误事件 */
  onError?(
  /** 音频播放错误事件的回调函数 */
  callback: WechatMiniprogram.OnEndedCallback): void;
  /** 监听音频暂停事件 */
  onPause?(
  /** 音频暂停事件的回调函数 */
  callback: WechatMiniprogram.OnPauseCallback): void;
  /** 监听音频播放事件 */
  onPlay?(
  /** 音频播放事件的回调函数 */
  callback: WechatMiniprogram.OnPlayCallback): void;
  /** 监听音频完成跳转操作的事件 */
  onSeeked?(
  /** 音频完成跳转操作的事件的回调函数 */
  callback: WechatMiniprogram.OnSeekedCallback): void;
  /** 监听音频进行跳转操作的事件 */
  onSeeking?(
  /** 音频进行跳转操作的事件的回调函数 */
  callback: WechatMiniprogram.OnSeekingCallback): void;
  /**  监听音频停止事件 */
  onStop?(
  /** 音频停止事件的回调函数 */
  callback: WechatMiniprogram.InnerAudioContextOnStopCallback): void;
  /** 监听音频播放进度更新事件 */
  onTimeUpdate?(
  /** 音频播放进度更新事件的回调函数 */
  callback: WechatMiniprogram.OnTimeUpdateCallback): void;
  /** 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发 */
  onWaiting?(
  /** 音频加载中事件的回调函数 */
  callback: WechatMiniprogram.OnWaitingCallback): void;
  /*******************************
   *          只读属性           *
   *******************************/
  /** 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲（只读） */
  buffered?: number;
  /** 当前音频的播放位置（单位 s）。只有在当前有合法的 src 时返回，时间保留小数点后 6 位（只读） */
  currentTime?: number;
  /** 当前音频的长度（单位 s）。只有在当前有合法的 src 时返回（只读） */
  duration?: number;
  /** 当前是是否暂停或停止状态（只读） */
  paused?: boolean;
}

interface CloudScheme<T>{
  /**
   * 注册成功时的函数
   * @param fun 成功的回调函数
   */
  then: (fun: (data: T) => void) => this
  /**
   * 注册失败时的函数
   * @param errcode 错误码
   * @param callback 失败时的回调
   */
  catch: (errcode: number, callback: (data: T) => void) => this
  /**
   * 捕获默认的失败函数
   * @param callback 回调函数
   */
  catchDefault: (callback: (data: T) => void) => this
  /**
   * 所有错误情况都执行该函数
   * @param callback 回调函数
   */
  catchAll: (callback: (data: T) => void) => this
  /**
   * 完成时调用
   * @param callback 回调函数
   */
  onComplete: (callback: () => void) => this
}