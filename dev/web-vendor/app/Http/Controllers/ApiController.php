<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function index(Request $request)
    {
        $client = new Client([
            'base_uri' => 'http://api.local',
            //'http_errors' => false,
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ]
        ]);


        $response = $client->request($request->method(), $request->path(), [
            'json' => $request->query()
        ]);

        return response($response->getBody(), $response->getStatusCode());
    }
}
