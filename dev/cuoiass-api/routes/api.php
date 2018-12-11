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
    Route::resource('staffs','Api\StaffController')->except(['create', 'show']);
    Route::resource('bookings','Api\BookingController');
//});

Route::fallback(function(){
    return response()->json(['message' => 'Not Found.'], 404);
})->name('api.fallback.404');
