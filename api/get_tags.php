<?php

/**
 * 获取某分类的标签列表
 */
require 'get_domain.php';
$domain = get_domain();
header('Content-type: application/json');
$id = isset($_GET['id']) ? $_GET['id'] : '3022';
$yuanma = file_get_contents($domain . '/web/video-' . $id . '.html', false, stream_context_create([
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
preg_match('/<ul class="clearfix">(.*?)<\/ul>/s', $yuanma, $matches);
preg_match_all('/<li.*?>(.*?)</s', $matches[1], $matches);
$data = isset($matches[1]) ? $matches[1] : [];
$data_2 = json_decode(file_get_contents('video_type.json'), true);
$name = '';
foreach ($data_2 as $item) {
    if ($item['id'] == $id) {
        $name = $item['name'];
        break;
    }
}
echo json_encode([
    'name' => $name,
    'id' => $id,
    'tags' => $data
]);
