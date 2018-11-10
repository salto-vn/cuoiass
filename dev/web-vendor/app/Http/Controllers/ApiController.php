<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function index(Request $request)
    {   
        
        $base_url = env('API_URL', '127.0.0.1');

        $client = new Client( [
            'base_uri' => $base_url,
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ]
        ] );
        $apinames = explode('/',$request->path());
        $apiname = $apinames[count($apinames) - 1];
        $response = $client->request( $request->method(), $apiname,
            [
                'json' => $request->query()
            ] );

        //return $response->getBody();

        return response($response->getBody(), $response->getStatusCode());
    }

    public  function index1(Request $request){

    }

}

