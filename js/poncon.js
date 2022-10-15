const Poncon = {
    title: '主播视频',
    storageKey: 'zbsp_jhawghdq', // 本地存储键名
    data: {},
    load: {}, // 页面初始化加载完成情况，pageName: true/false
    tempTitle: {}, // 用于必要时记录页面标题
    request: $.post('api/empty.php'),
    /**
     * 获取存储值
     * @param {string} key 键名
     * @returns {any} 返回值
     */
    getStorage(key) {
        var data = localStorage[this.storageKey]
        try {
            data = JSON.parse(data)
            return data[key]
        } catch {
            return null
        }
    },
    /**
     * 设置存储值
     * @param {string} key 键名
     * @param {any} value 值
     */
    setStorage(key, value) {
        var data = localStorage[this.storageKey]
        data = data ? data : '{}'
        try {
            data = JSON.parse(data)
        } catch {
            data = {}
        }
        data[key] = value
        localStorage[this.storageKey] = JSON.stringify(data)
    },
}
