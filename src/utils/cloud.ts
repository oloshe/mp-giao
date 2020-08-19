/**
 * 本文件封装了云函数的方法
 * 通过链式的调用让逻辑更加一目了然
 * 使用的条件是云函数要按照一定的规则返回函数
 * 
 * | 字段 | 类型 |
 * |-|-|
 * | errcode | number |
 * | data | T (泛型) |
 * 
 * 其中 `errcode === 0` 时表示接口正常，其他值表示异常或错误。
 */


/**
 * 云函数响应体
 */
interface Response<T> {
    errcode: number
    data: T
}

/**
 * 云计划
 * 用于指定一个云函数运行之后对于结果的各种处理
 */
class CloudScheme<T>{

    protected onSuccess: Function

    protected failHandle: Record<string, (data: T) => void>

    protected defaultFailHandle: (data: T) => void

    protected allCaseFailHandle: (data: T) => void

    protected onCompleteFn: () => void

    constructor() {
        this.onSuccess = () => { }
        this.failHandle = {}
        this.defaultFailHandle = () => { }
        this.allCaseFailHandle = () => { }
        this.onCompleteFn = () => { }
    }

    /**
     * 注册成功时的函数
     * @param fun 成功的回调函数
     */
    then(fun: (data: T) => void) {
        this.onSuccess = fun
        return this
    }

    /**
     * 注册失败时的函数
     * @param errcode 错误码
     * @param callback 失败时的回调
     */
    catch(errcode: number, callback: (data: T) => void) {
        this.failHandle[errcode] = callback
        return this
    }

    /**
     * 捕获默认的失败函数
     * @param callback 回调函数
     */
    catchDefault(callback: (data: T) => void) {
        this.defaultFailHandle = callback
        return this
    }

    /**
     * 所有错误情况都执行该函数
     * @param callback 回调函数
     */
    catchAll(callback: (data: T) => void) {
        this.allCaseFailHandle = callback
        return this
    }

    /**
     * 完成时调用
     * @param callback 回调函数
     */
    onComplete(callback: () => void) {
        this.onCompleteFn = callback
        return this
    }
}

/**
 * 私有云计划
 */
class PrivateCloudScheme<T> extends CloudScheme<T>{
    constructor() {
        super()
    }

    /**
     * 执行完成函数
     */
    execComplete() {
        this.onCompleteFn()
    }

    /**
     * 执行成功回调
     * @param data 云函数响应中的数据
     */
    execSuccess(data: T) {
        this.onSuccess(data)
    }

    /**
     * 执行错误回调
     * @param errcode 错误码
     * @param data 参数
     */
    execFail(errcode: number, data: T) {
        (this.failHandle[errcode] ?? this.defaultFailHandle)(data)
        this.allCaseFailHandle(data)
    }
    /**
     * 摧毁实例
     * 
     * **尚未测试不知道是否会错误**
     */
    destory() {
        delete this.onSuccess
        delete this.failHandle
    }
}

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
export function callFunction<
    T extends {},
    DataType extends {},
    >(model: string, func: string, data?: DataType): CloudScheme<T> {
    const cloudResult = new PrivateCloudScheme<T>()
    wx.cloud.callFunction({
        name: model,
        data: {
            type: func,
            data: data,
        },
    })
        .then(response => {
            cloudResult.execComplete()
            const result = response.result as Response<T>
                , { errcode, data } = result
            if (errcode === 0) {
                cloudResult.execSuccess(data)
            } else {
                cloudResult.execFail(errcode, data)
            }
            cloudResult.destory()
        })
        .catch(e => {
            console.log(`Cloud Error [${model}/${func}]:`, e)
        })
    // 转换为父类，只暴露出 then 和 catch 方法
    return cloudResult as CloudScheme<T>
}

/**
 * 模块
 * 此处定义云函数的各个模块的枚举
 * 使用枚举有诸多好处
 * 如果不使用枚举可以替换成string
 */
export const MODEL = {
    USER: 'USER'
}

/**
 * 函数
 * 此处定义云函数的各个模块下的方法的方法名
 * 如果不使用这种方式可以替换成string
 */
export const FUNC = {
    /** 用户模块  */
    USER: {
        /** 签到 */
        SIGN: 'SIGN',
    },
}


/*
// 用法样例
interface IResponse {
    type: number
    value: number
}
interface IParam {
    arg: number
}
// 1. 直接使用 callFunction(...) 则没有类型的约束
// 2. 使用 callFunction<type1, type2>(...) 分别对响应体数据和参数做了类型约束
callFunction<IResponse, IParam>(MODEL.USER, FUNC.USER.SIGN, { arg: 1 })
    .onComplete(() => {
        //完成时执行该回调，不管错误码是多少！而且总是第一个执行
        console.log('完成')
    })
    .then(data => {
        // 错误码为0的时候执行的函数
        console.log('签到成功', data)
    })
    .catch(-1, data => {
        // 错误码为-1的时候执行的函数
        console.log('今日已签到', data)
    })
    .catch(-2, () => {
        // 错误码为-2的时候执行的函数
        console.log('错误码为-2')
    })
    .catchDefault(data => {
        // 错误码为其他值的时候执行的函数
        console.log('当错误码是在catch中没有注册的时候，会执行该函数，如果谢过了就不会执行该函数', data)
    })
    .catchAll(data => {
        // 错误码不等于0就会执行该函数
        // 不妨碍catch / catchDefault函数的执行，且总是比他们慢执行
        console.log('所有错误情况的监听函数', data)
    })
// 执行顺序 onComplete -> (then / catch / catchDefault) -> catchAll
// 写的时候可以不按照顺序来写
*/