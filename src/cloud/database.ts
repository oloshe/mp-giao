const db = wx.cloud.database()
    // , _ = db.command
    // , $ = _.aggregate

/**
 * 获取数据库文档
 * @param collection 集合
 * @param docId 文档id
 * @param onSuccess 成功回调
 */
export function getDocument<T>(collection: string, docId: string, onSuccess: (data: T) => void) {
    db.collection(collection).doc(docId).get({
        success: onSuccess,
        fail: console.error.bind(console, `数据获取失败：${collection}.[${docId}]`)
    }) 
}
