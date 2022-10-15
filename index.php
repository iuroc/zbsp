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
    <link rel="stylesheet" href="css/index.css?<?php echo time(); ?>">
    <script src="js/poncon.js?<?php echo time(); ?>"></script>
    <script src="js/index.js?<?php echo time(); ?>"></script>
</head>

<body class="user-select-none">
    <nav class="navbar navbar-expand-sm navbar-light bg-light shadow-sm sticky-top mb-3 mb-sm-4">
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
                <li class="nav-item nav-active-book">
                    <a class="nav-link" href="#/book">图片</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container pb-4">
        <div class="page-home page-oyp">

        </div>
        <div class="page-fileList page-oyp">
            2
        </div>
    </div>

</body>

</html>