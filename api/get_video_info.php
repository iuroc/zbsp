<?php

/**
 * 获取视频详情
 */
require 'get_domain.php';
$domain = get_domain();
header('Content-type: application/json');
$id = isset($_GET['id']) ? $_GET['id'] : '58513';
$yuanma = file_get_contents($domain . '/web/videodetails.aspx?vid=' . $id, false, stream_context_create([
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\nuser-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42",
        'method' => 'GET',
        'timeout' => 900,
        'content' => ''
    ],
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false,
    ],
]));
preg_match('/var\s*vurl\s*=\s*\'(.*?)\'/', $yuanma, $matches);
$vurl = $matches[1];
preg_match('/var\s*vtype\s*=\s*\'(.*?)\'/', $yuanma, $matches);
$vtype = $matches[1];
preg_match('/var\s*title\s*=\s*\'(.*?)\'/', $yuanma, $matches);
$title = $matches[1];
preg_match('/var\s*coverimg\s*=\s*\'(.*?)\'/', $yuanma, $matches);
$coverimg = $matches[1];
preg_match('/var\s*xl1\s*=\s*\'(.*?)\'/', $yuanma, $matches);
$xl1 = $matches[1];
preg_match('/var\s*xl2\s*=\s*\'(.*?)\'/', $yuanma, $matches);
$xl2 = $matches[1];
echo json_encode([
    'id' => $id,
    'title' => $title,
    'vtype' => $vtype,
    'coverimg' => $coverimg,
    'xl' => [$xl1, $xl2],
    'vurl' => [
        $xl1 . $vurl,
        $xl2 . $vurl
    ]
]);
