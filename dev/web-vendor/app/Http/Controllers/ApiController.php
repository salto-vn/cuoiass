<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $client = new Client([
            'base_uri' => 'http://api.wedding.local',
            'http_errors' => false,
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json'
            ]
        ]);

        $routeName = str_replace(config('wedding.api_prefix'), '', $request->path());
        $response = $client->request($request->method(), $routeName, [
            'json' => $request->input()
        ]);

        return response($response->getBody(), $response->getStatusCode());
    }
}
