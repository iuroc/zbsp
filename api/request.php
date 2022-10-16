<?php

/**
 * 发送请求
 */
require 'get_domain.php';

$domain = get_domain();

// 指定 path 部分
if (isset($_GET['path'])) {
    $path = $_GET['path'];
    unset($_GET['path']);
} else {
    $path = '/web/abcdefg.ashx';
}
header('Content-type: application/json');
echo file_get_contents($domain . $path, false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-type: application/x-www-form-urlencoded",
        'content' => http_build_query($_GET),
        'timeout' => 900
    ],
]));
