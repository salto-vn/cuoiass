<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function index(Request $request)
    {   
        
        $client = new Client([
            'base_uri' => env('API_URL', 'http://localhost:1234/'),
            //'http_errors' => false,
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ]
        ]);
        
        
        $response = $client->request($request->method(), $request->path(), [
            'json' => $request->query()
        ]);

        dd($response->getStatusCode());

        //return $response->getBody();

        return response($response->getBody(), $response->getStatusCode());
    }
}

