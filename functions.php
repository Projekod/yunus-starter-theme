<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('display_startup_errors', true);


require_once __DIR__ . '/vendor/autoload.php';

$timber = new \Timber\Timber();

require_once __DIR__ . '/YunusTheme.php';