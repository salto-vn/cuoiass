<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

//Route::group(['middleware' => ['api']], function(){
    //Review Route
    Route::resource('reviews', 'Api\ReviewController');
    Route::resource('roles', 'Api\RoleController')->except(['create', 'destroy']);
    Route::resource('staffs','Api\StaffController')->except(['create', 'edit']);
    Route::resource('bookings','Api\BookingController')->except(['show']);


    $router->get('/services', 'Api\MasterServiceController@index');
    $router->post('/bookings/{booked_cd}', 'Api\BookingController@show');
    $router->get('/reviews', 'Api\ReviewController@index');
    $router->get('/reviews/{review_id}', 'Api\ReviewController@show');
    $router->put('/reviews', 'Api\ReviewController@update');


//});
