<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FooController extends Controller
{
    //

    public function getListFoo() {
        $urlapi = env('API_URL', '127.0.0.1');
        $base_url = $urlapi.'/api/';
        $client = new \GuzzleHttp\Client( [
            'base_uri' => $base_url,
        ] );
        $path = 'foo';

        $response = $client->request( 'GET', $path,
            [
                'allow_redirects' => true,
            ] );

        $response_body = (string) $response->getBody();
        return json_decode($response_body,true);
    }
}
