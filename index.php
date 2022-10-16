<?php require 'config.php'; ?>
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $config['title'] ?></title>
    <meta name="description" content="<?php echo $config['description'] ?>">
    <link rel="stylesheet" href="https://cdn.staticfile.org/bootstrap/4.6.0/css/bootstrap.min.css" />
    <style>
        .page-oyp {
            display: none;
        }
    </style>
    <script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/bootstrap/4.6.0/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.staticfile.org/clipboard.js/2.0.10/clipboard.min.js"></script>
    <link rel="stylesheet" href="css/index.css?<?php echo time(); ?>">
    <script src="js/poncon.js?<?php echo time(); ?>"></script>
    <script src="js/index.js?<?php echo time(); ?>"></script>
</head>

<body class="user-select-none">
    <nav class="navbar navbar-expand-md navbar-light bg-light shadow-sm sticky-top mb-3 mb-sm-4">
        <a class="navbar-brand" href="#"><?php echo $config['title'] ?></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item nav-active-home">
                    <a class="nav-link" href="#/">主页</a>
                </li>
                <li class="nav-item nav-active-video">
                    <a class="nav-link" href="#/video">影片</a>
                </li>
                <li class="nav-item nav-active-book">
                    <a class="nav-link" href="#/book">小说</a>
                </li>
                <li class="nav-item nav-active-photo">
                    <a class="nav-link" href="#/photo">图片</a>
                </li>
                <li class="nav-item nav-active-audio">
                    <a class="nav-link" href="#/audio">有声</a>
                </li>
            </ul>
            <div class="form-inline my-2 my-sm-0">
                <input class="form-control mr-md-2" type="search" placeholder="请输入关键词" aria-label="Search">
                <button class="btn btn-primary my-2 my-sm-0" type="submit">搜索</button>
            </div>
        </div>
    </nav>
    <div class="container pb-4">
        <div class="page-home page-oyp">
            <div class="row mb-2">
                <script>
                    var html = ''
                    var text = ['影片中心', '文字小说', '图集中心', '有声小说']
                    var imgs = ['img/video.svg', 'img/book.svg', 'img/photo.svg', 'img/audio.svg']
                    var targets = ['video', 'book', 'photo', 'audio']
                    text.forEach((item, index) => {
                        html += `<div class="col-lg-3 col-6 mb-3 ${index % 2 ? 'pl-1 pl-sm-3' : 'pr-1 pr-sm-3'}">
                                    <div class="border rounded shadow-sm py-2 nav_listItem" onclick="location.hash='/${targets[index]}'">
                                        <div class="media align-items-center justify-content-center">
                                            <img src="${imgs[index]}" class="mr-2 mr-sm-3" width="40" height="40">
                                            <div class="h5 my-0">${item}</div>
                                        </div>
                                    </div>
                                </div>`
                    })
                    document.write(html)
                </script>
            </div>
            <div class="mb-4 d-flex align-items-center">
                <h5 class="mb-0">视频推荐</h5>
                <div class="dropright ml-auto ml-sm-3">
                    <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                        最新发布
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" onclick="Poncon.home_loadVideoList(1, 24, 1)">最新发布</a>
                        <a class="dropdown-item" onclick="Poncon.home_loadVideoList(1, 24, 2)">本周最热</a>
                        <a class="dropdown-item" onclick="Poncon.home_loadVideoList(1, 24, 3)">本月最热</a>
                    </div>
                </div>
            </div>
            <div class="row video_list"></div>
            <div class="text-center loading">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <button class="btn btn-primary loadMore" style="display: none;">加载更多</button>
        </div>
        <div class="page-video page-oyp">
            <h5 class="mb-4">视频分类</h5>
            <div class="row videoTypeList"></div>
        </div>
        <div class="page-videoList page-oyp">
            <div class="tabs text-nowrap"></div>
        </div>
        <div class="page-play page-oyp">
            <div class="video_box border shadow-sm mb-4 overflow-hidden">
                <div class="embed-responsive embed-responsive-16by9"></div>
                <div class="text-center loading">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="mt-2 lead">正在加载中</div>
                </div>
            </div>
            <h5 class="text-justify mb-4 videoTitle"></h5>
            <div class="row">
                <div class="col-xl-7 col-lg-8 col-md-9">
                    <div class="btns row">
                        <div class="col-sm-3 col-6 mb-3 pr-2">
                            <button class="btn btn-outline-secondary btn-block" onclick="Poncon.play_reload()">刷新播放</button>
                        </div>
                        <div class="col-sm-3 col-6 mb-3 pl-2 pr-sm-2">
                            <button class="btn btn-outline-danger btn-block" onclick="Poncon.play_reload(0)">线路一</button>
                        </div>
                        <div class="col-sm-3 col-6 mb-3 pr-2 pl-sm-2">
                            <button class="btn btn-outline-success btn-block" onclick="Poncon.play_reload(1)">线路二</button>
                        </div>
                        <div class="col-sm-3 col-6 mb-3 pl-2">
                            <button class="btn btn-outline-info btn-block" onclick="Poncon.play_downloadInfo()">下载视频</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="modal fade downloadVideoInfo" data-keyboard="false" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">下载视频</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">视频标题</span>
                        </div>
                        <input type="text" class="form-control input-title">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary copybtn" data-clipboard-target=".input-title">复制</button>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">下载线路1</span>
                        </div>
                        <input type="text" class="form-control input-downloadUrl1">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary copybtn" data-clipboard-target=".input-downloadUrl1">复制</button>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">下载线路2</span>
                        </div>
                        <input type="text" class="form-control input-downloadUrl2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary copybtn" data-clipboard-target=".input-downloadUrl2">复制</button>
                        </div>
                    </div>
                    <div class="msg">
                        <b>下载方法：</b>首先复制视频标题和下载链接，然后打开 M3U8 视频下载工具（这里推荐 <a href="https://github.com/nilaoda/N_m3u8DL-CLI/releases" target="_blank">N_m3u8DL-CLI</a>），将标题和链接粘贴进去，点击下载即可
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</body>

</html>