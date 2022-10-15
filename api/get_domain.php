<?php

/**
 * 
 * 获取最新域名
 */
function main()
{
    stream_context_set_default([
        'http' => [
            'proxy' => 'tcp://127.0.0.1:7890',
            'request_fulluri' => True
        ]
    ]);
    // 初始化JSON文件
    if (!file_exists('domain_info.json')) {
        $domain_info = [
            'update_at' => 0,
            'domain' => 'https://web.dxj.mobi/'
        ];
        file_put_contents('domain_info.json', json_encode($domain_info));
    } else {
        $domain_info = json_decode(file_get_contents('domain_info.json'), true);
    }
    $update_at = $domain_info['update_at'];
    // 判断是否过期 1天更新一次
    if (time() - $update_at > 24 * 60 * 60) {
        $headers = get_headers($domain_info['domain']);
        $domain_info['update_at'] = time();
        foreach ($headers as $item) {
            preg_match('/location.*?:.*?(http.*)/i', $item, $matches);
            if (isset($matches[1])) {
                $domain_info['domain'] = $matches[1];
                break;
            }
        }
        file_put_contents('domain_info.json', json_encode($domain_info));
    }
    echo $domain_info['domain'];
}

main();
