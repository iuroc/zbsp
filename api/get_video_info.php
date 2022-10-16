<?php

/**
 * 获取视频详情
 */
require 'get_domain.php';
$domain = get_domain();
header('Content-type: application/json');
$id = isset($_GET['id']) ? $_GET['id'] : '58513';
$yuanma = file_get_contents($domain . '/web/videodetails.aspx?vid=' . $id);
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
