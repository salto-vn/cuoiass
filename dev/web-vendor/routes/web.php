<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get( '/foo', function ( Request $request ) {

    $pitchers = collect([
        [
            'key'  => 'saito',
            'name' => '斎藤',
            'era'  => 1.62,
            'win'  => 20,
        ],
        [
            'key'  => 'makihara',
            'name' => '槇原',
            'era'  => 2.29,
            'win'  => 12,
        ],
        [
            'key'  => 'kuwata',
            'name' => '桑田',
            'era'  => 2.60,
            'win'  => 17,
        ],
    ]);

    return response()->json( $pitchers );
} );
