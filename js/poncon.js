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
        audio: {},
        videoList: {}
    },
    load: {}, // 页面初始化加载完成情况，pageName: true/false
    tempTitle: {}, // 用于必要时记录页面标题
    // request: $.get('api/empty.php'),
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
        $.get('http://lock.apee.top/zbsp/api/request.php', data, function (data) {
            This.load.home = true
            Page.find('.loading').hide()
            var list = data.videos || []
            if (list.length > 0) {
                Page.find('.loadMore').removeAttr('disabled').show().html('加载更多')
            } else {
                Page.find('.loadMore').html('已经到底了')
            }
            var html = This.make_listHtml(list)
            Page.find('.video_list').append(html)
            Page.find('.loadMore').unbind().click(function () {
                This.home_loadVideoList(++page, pageSize, sort)
            })
        })
    },
    /**
     * 生成视频列表HTML代码
     * @param {} list 列表
     * @returns 
     */
    make_listHtml(list) {
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
        return html
    },
    /**
     * 加载视频播放页
     * @param {string} id 视频ID
     */
    play_loadVideo(id) {
        var This = this
        var Page = $('.page-play')
        var ele = Page.find('.video_box .embed-responsive')
        Page.find('.videoTitle').html('...')
        Page.find('.btns').hide()
        ele.html('')
        $.get('http://lock.apee.top/zbsp/api/get_video_info.php', {
            id: id
        }, function (data) {
            Page.find('.btns').show()
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
    },
    /**
     * 加载视频分类列表
     */
    video_loadTypes() {
        var Page = $('.page-video')
        $.get('http://lock.apee.top/zbsp/api/video_type.json', function (data) {
            Poncon.load.video = true
            var html = ''
            data.forEach((item, index) => {
                html += `<div class="col-xl-2 col-lg-3 col-md-4 col-6 mb-4 ${index % 2 ? 'col_right' : 'col_left'}">
                            <div class="media typeListItem rounded shadow-sm border py-2 align-items-center justify-content-center" onclick="Poncon.load.videoList=false;location.hash='/videoList/${item.id}'">
                                <img src="img/video.svg" class="mr-2 mr-sm-3" width="32" height="32">
                            ${item.name}
                            </div>
                        </div>`
            })
            Page.find('.videoTypeList').html(html)
        })
    },
    /**
     * 获取标签列表
     */
    videoList_loadTags(id) {
        var Page = $('.page-videoList')
        Page.find('.tabs').html('')
        Page.find('.topbox').hide()
        Page.find('.videoTypeName').html('...')
        $.get('http://lock.apee.top/zbsp/api/get_tags.php', {
            id: id
        }, function (data) {
            Page.find('.topbox').show()
            Page.find('.videoTypeName').html(data.name)
            if (data.tags.length < 2) {
                Page.find('.tabs').removeClass('mb-4')
                return
            }
            var html = ''
            data.tags.forEach(item => {
                html += `<div class="btn mr-2 btn-light border tabItem" onclick="Poncon.videoList_changeTag(this)">${item}</div>`
            })
            Page.find('.tabs').html(html).addClass('mb-4')
            $(Page.find('.tabs .tabItem')[0]).removeClass('btn-light').addClass('btn-secondary')
        })
    },
    videoList_changeTag(ele) {
        var tag = ele.innerText
        var Page = $('.page-videoList')
        Page.find('.tabs .tabItem').removeClass('btn-secondary').addClass('btn-light')
        $(ele).removeClass('btn-light').addClass('btn-secondary')
        var data = this.data.videoList
        this.videoList_loadVideoList(data.id, tag, 1, data.pagesize, data.sort)
    },
    /**
     * 获取某一类的视频列表
     * @param {*} id 分类ID
     * @param {*} tag 标签名称
     * @param {*} page 页码
     * @param {*} pageSize 每页加载数量
     */
    videoList_loadVideoList(id, tag, page, pageSize, sort) {
        var This = this
        var Page = $('.page-videoList')
        if (page == 1) {
            Page.find('.video_list').html('')
            Page.find('.loading').show()
            Page.find('.loadMore').hide()
        }
        Page.find('.loadMore').attr('disabled', 'disabled').html('正在加载中')
        $.get('http://lock.apee.top/zbsp/api/request.php', {
            action: 'getvideos',
            vtype: id,
            pageindex: page || 1,
            pagesize: pageSize || 24,
            tags: tag || '全部',
            sortindex: sort || 1,
        }, function (data) {
            This.data.videoList.id = id
            This.data.videoList.tag = tag
            This.data.videoList.page = page
            This.data.videoList.pageSize = pageSize
            This.data.videoList.sort = sort
            This.load.videoList = true
            Page.find('.loading').hide()
            var list = data.videos || []
            if (list.length > 0) {
                Page.find('.loadMore').removeAttr('disabled').show().html('加载更多')
            } else {
                Page.find('.loadMore').html('已经到底了')
            }
            var html = This.make_listHtml(list)
            Page.find('.video_list').append(html)
            Page.find('.loadMore').unbind().click(function () {
                This.videoList_loadVideoList(id, tag, ++page, pageSize, sort)
            })
        })
    },
    /**
     * 排序
     * @param {*} sort 1 2 3
     */
    videoList_changeSort(sort) {
        var data = this.data.videoList
        this.videoList_loadVideoList(data.id, data.tag, 1, data.pagesize, sort)
    },
    /**
     * 加载文字小说分类选项卡
     */
    book_loadBookType(id) {
        var Page = $('.page-book')
        $.get('api/book_type.json', function (data) {
            var list = data || []
            var html = ''
            for (var i = 0; i < list.length; i++) {
                html += `<div class="btn mr-2 btn-light border tabItem tabItem-${list[i].id}" onclick="Poncon.book_loadList(${list[i].id}, 1, 24)">${list[i].name}</div>`
            }
            Page.find('.tabs').html(html)
            Page.find('.tabItem-' + id).removeClass('btn-light').addClass('btn-secondary')
            document.title = $('.tabItem-' + id).text() + ' - ' + Poncon.title
        })
    },
    /**
     * 加载文字小说列表
     * @param {*} id 分类ID
     * @param {*} page 页码
     * @param {*} pageSize 每页数量
     */
    book_loadList(id, page, pageSize) {
        var Page = $('.page-book')
        history.replaceState({}, '', '#/book/' + id)
        Page.find('.tabs .tabItem').removeClass('btn-secondary').addClass('btn-light')
        document.title = $('.tabItem-' + id).text() + ' - ' + Poncon.title
        $('.tabItem-' + id).removeClass('btn-light').addClass('btn-secondary')
        if (page == 1) {
            Page.find('.bookList').html('')
            Page.find('.loading').show()
            Page.find('.loadMore').hide()
        }
        Page.find('.loadMore').attr('disabled', 'disabled').html('正在加载中')
        var This = this
        $.get('http://lock.apee.top/zbsp/api/request.php', {
            action: 'getbooks',
            vtype: id || 101,
            pageindex: page || 1,
            pagesize: pageSize || 24
        }, function (data) {
            Poncon.load.book = true
            var data = Array.isArray(data.data) ? data.data : []
            var html = ''
            Page.find('.loading').hide()
            if (data.length > 0) {
                Page.find('.loadMore').removeAttr('disabled').show().html('加载更多')
            } else {
                data.find('.loadMore').html('已经到底了')
            }
            data.forEach(item => {
                html += `<div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                            <div class="card h-100 card-body shadow-sm listItem" onclick="location.hash='/read/${item.id}'">
                                <div class="lead mb-2">${item.title}</div>
                                <div class="time">${item.times.split(' ')[0]}</div>
                            </div>
                        </div>`
            })
            Page.find('.bookList').append(html)
            Page.find('.loadMore').unbind().click(function () {
                This.book_loadList(id, ++page || 1, pageSize || 24)
            })
        })
    },
    /**
     * 加载小说内容
     * @param {string} id 小说ID
     */
    read_loadContent(id) {
        var Page = $('.page-read')
        Page.find('.title, .time').html('...')
        Page.find('.content').html('正在加载中...')
        $.get('http://lock.apee.top/zbsp/api/request.php', {
            action: 'getbookcontent',
            id: id
        }, function (data) {
            var info = data.data[0]
            var content = info.bookcontents
            var title = info.title
            var time = info.times
            Page.find('.time').html(time)
            Page.find('.title').html(title)
            Page.find('.content').html(content)
        })
    }
}
