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
            'http_errors' => false,
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ]
        ] );

        $apiname = str_replace('api/','',$request->path());
        $response = $client->request( $request->method(), $apiname,
            [
                'json' => $request->input()
            ] );

        return response($response->getBody(), $response->getStatusCode());
    }

}

