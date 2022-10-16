history.scrollRestoration = 'manual'
$(document).ready(function () {
    // Poncon.login(true)
    router(location.hash)
    function router(hash) {
        scrollTo(0, 0)
        hash = hash.split('/')
        var target = hash[1]
        // target非法状态
        if (!target || !target.match(/^\w+$/)) {
            target = 'home'
        }
        $('.page-oyp').css('display', 'none')
        var Page = $('.page-' + target)
        Page.css('display', 'block')
        $('.nav-item').removeClass('active')
        $('.nav-active-' + target).addClass('active')
        if (target == 'home') {
            history.replaceState({}, null, './')
            document.title = '主页 - ' + Poncon.title
            if (!Poncon.load.home) {
                Poncon.home_loadVideoList()
            }
        } else if (target == 'play') {
            document.title = '视频播放器 - ' + Poncon.title
            if (!Poncon.load.play) {
                var id = hash[2]
                Poncon.play_loadVideo(id)
            } else {
                document.title = Poncon.data.play.title + ' - ' + Poncon.title
            }
        } else if (target == 'video') {
            document.title = '影片中心 - ' + Poncon.title
            if (!Poncon.load.video) {
                Poncon.video_loadTypes()
            }
        } else if (target == 'book') {

        } else if (target == 'photo') {

        } else if (target == 'audio') {

        } else if (target == 'videoList') {
            var id = hash[2]
            if (!Poncon.load.videoList) {
                Poncon.videoList_loadTags(id)
                Poncon.videoList_loadVideoList(id, '全部', 1, 24)
            }
        } else {
            location.hash = ''
        }
    }
    document.body.ondragstart = () => { return false }
    window.addEventListener('hashchange', function (event) {
        var hash = new URL(event.newURL).hash
        router(hash)
    })
    new ClipboardJS('.copybtn')
    $('.page-videoList .tabs')[0].addEventListener('wheel', function (event) {
        event.preventDefault()
        if (Poncon.data.videoList.scroll_start) {
            return
        }
        Poncon.data.videoList.scroll_start = true
        $(this).animate({
            scrollLeft: $(this).scrollLeft() + 200 * (event.deltaY > 0 ? 1 : -1)
        }, 300)
        setTimeout(() => {
            Poncon.data.videoList.scroll_start = false
        }, 300)
        // this.scrollLeft += event.deltaY
    })
})
