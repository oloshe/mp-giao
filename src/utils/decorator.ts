
export const Storage = (key: string) => {
    return (target: any) => {
        const value = wx.getStorageSync(key)
        const fn = (data: any) => {
            wx.setStorageSync(key, data)
            target[key] = data
            return data
        }
        class StorageData {
            private _value
            constructor(value: any) {
                this._value = value
            }
            public get value() {
                return this._value
            }
            public set value(value: any) {
                this._value = fn(value)
            }
        }
        target[key] = new StorageData(value)
    }
}
