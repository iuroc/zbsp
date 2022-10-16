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
        // 控制侧边选项卡阴影
        // $('.oyp-action, .oyp-action-sm').removeClass('oyp-active')
        // $('.tab-' + target).addClass('oyp-active')
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
})
