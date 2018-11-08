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

$router->group(['prefix' => config('wedding.api_prefix')], function () use ($router) {
    $router->get('/api/{any:.*}', 'ApiController@index');
    $router->post('/api/{any:.*}', 'ApiController@index');
    $router->put('/api/{any:.*}', 'ApiController@index');
    $router->delete('/api/{any:.*}', 'ApiController@index');
});

$router->get('/{any:.*}', 'HomeController@index');
