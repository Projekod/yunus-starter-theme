<?php
use Timber\Timber;

$context = Timber::get_context();
Timber::render(array('pages/404.twig'), $context);
