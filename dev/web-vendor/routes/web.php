<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('/{any:.*}', 'ApiController@index');
    $router->post('/{any:.*}', 'ApiController@store');
    $router->put('/{any:.*}', 'ApiController@index');
    $router->delete('/{any:.*}', 'ApiController@index');
});

$router->get('/{any:.*}', 'HomeController@index');
