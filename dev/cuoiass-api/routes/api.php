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
    /**
     * Route for account
     */
    Route::post('users', 'Api\AccountController@index')->name('users.index');
    Route::post('users/store', 'Api\AccountController@store')->name('users.store');
    Route::put('users/{$id}', 'Api\AccountController@update')->name('users.update');
    Route::delete('users/{$id}', 'Api\AccountController@destroy')->name('users.edit');
    Route::post('users/{$id}/edit', 'Api\AccountController@edit')->name('users.edit');

    //Review Route
    Route::resource('reviews', 'Api\ReviewController');
//});

