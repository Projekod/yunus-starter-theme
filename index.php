<?php

use Timber\Timber;

$context          = Timber::get_context();
$context['posts'] = Timber::get_posts();

Timber::render( 'pages/home.twig', $context );


