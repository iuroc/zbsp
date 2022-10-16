const Poncon = {
    title: '主播视频',
    storageKey: 'zbsp_jhawghdq', // 本地存储键名
    data: {
        home: {},
        play: {
            player: 'https://oyps.gitee.io/player/#'
        },
        video: {},
        photo: {},
        audio: {}
    },
    load: {}, // 页面初始化加载完成情况，pageName: true/false
    tempTitle: {}, // 用于必要时记录页面标题
    request: $.get('api/empty.php'),
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
    /**
     * 主页加载视频列表
     */
    home_loadVideoList(page, pageSize, sort) {
        page = page || 1
        pageSize = pageSize || 24
        sort = sort || 1
        var data = {
            action: 'getnewvideos',
            first_menuid: 0,
            pagesize: pageSize,
            pageindex: page,
            sortindex: sort
        }
        var Page = $('.page-home')
        if (page == 1) {
            Page.find('.video_list').html('')
            Page.find('.loading').show()
            Page.find('.loadMore').hide()
        }
        Page.find('.loadMore').attr('disabled', 'disabled').html('正在加载中')
        var This = this
        this.request.abort()
        this.request = $.get('api/request.php', data, function (data) {
            This.load.home = true
            Page.find('.loading').hide()
            Page.find('.loadMore').removeAttr('disabled').show().html('加载更多')
            var list = data.videos || []
            var html = ''
            list.forEach(item => {
                html += `<div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                            <div class="border rounded shadow-sm listItem h-100 overflow-hidden" onclick="Poncon.load.play=false;location.hash='/play/${item.id}'">
                                <div class="embed-responsive embed-responsive-16by9 overflow-hidden">
                                    <div class="embed-responsive-item">
                                        <img class="w-100" src="${item.coverimg}" class="card-img-top" alt="${item.title}">
                                    </div>
                                </div>
                                <div class="p-2 p-sm-3 box_iasas">
                                    <div class="mb-2 oyp-limit-line title_askjfhj text-justify">${item.title}</div>
                                    <div class="clearfix text-muted">
                                        <div class="float-left">${item.updatedate.split(' ')[0]}</div>
                                        <div class="float-right">${item.viewcount > 1E4 ? (item.viewcount / 1E4).toFixed(1) + '万' : item.viewcount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            })
            Page.find('.video_list').append(html)
            Page.find('.loadMore').unbind().click(function () {
                This.home_loadVideoList(++page, pageSize, sort)
            })
        })
    },
    /**
     * 加载视频播放页
     * @param {string} id 视频ID
     */
    play_loadVideo(id) {
        var This = this
        var Page = $('.page-play')
        var ele = Page.find('.video_box .embed-responsive')
        ele.html('')
        this.request.abort()
        this.request = $.get('api/get_video_info.php', {
            id: id
        }, function (data) {
            This.load.play = true
            document.title = data.title + ' - ' + This.title
            This.data.play.title = data.title
            This.data.play.vurl = data.vurl
            This.data.play.vurl_index = 0
            var Modal = $('.downloadVideoInfo')
            Modal.find('.input-title').val(data.title)
            Modal.find('.input-downloadUrl1').val(data.vurl[0])
            Modal.find('.input-downloadUrl2').val(data.vurl[1])
            Page.find('.videoTitle').html(data.title)
            var ele = Page.find('.video_box .embed-responsive')
            ele.html('<iframe class="embed-responsive-item" src="' + This.data.play.player + data.vurl[0] + '" allowfullscreen></iframe>')
        })
    },
    /**
     * 重置播放
     */
    play_reload(index) {
        if (index != null) {
            this.data.play.vurl_index = index
        }
        var Page = $('.page-play')
        var ele = Page.find('.video_box .embed-responsive')
        ele.html('')
        var vurl_play = this.data.play.vurl[this.data.play.vurl_index]
        ele.html('<iframe class="embed-responsive-item" src="' + this.data.play.player + vurl_play + '" allowfullscreen></iframe>')
    },
    /**
     * 弹窗显示视频下载向导
     */
    play_downloadInfo() {
        var Modal = $('.downloadVideoInfo')
        console.log(Modal);
        Modal.modal('show')
    }
}
