<?php
// Local PHP development router.
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($path === '/api/mayhem/KeyboardAuth' || $path === '/api/mayhem/KeyboardAuth/') {
    require __DIR__ . '/api/mayhem/KeyboardAuth/index.php';
    return true;
}
$file = __DIR__ . $path;
if ($path !== '/' && is_file($file)) {
    return false;
}
if ($path === '/') {
    require __DIR__ . '/index.php';
    return true;
}
http_response_code(404);
echo 'Not found';
