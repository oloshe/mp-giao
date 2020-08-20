const db = wx.cloud.database()
    // , _ = db.command
    // , $ = _.aggregate

export function getDocument<T>(collection: string, docId: string, onSuccess: (data: T) => void) {
    db.collection(collection).doc(docId).get({
        success: onSuccess,
        fail: console.error.bind(console, `数据获取失败：${collection}.[${docId}]`)
    })
        
}
