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
        $input = $this->convertColumns($routeName, $request->input());
        $response = $client->request($request->method(), $routeName, [
            'json' => $input
        ]);

        return response($response->getBody(), $response->getStatusCode());
    }

    /**
     * @param $key
     * @param $input
     */
    private function convertColumns($key, $input)
    {
        switch (trim($key, '/')) {
            case 'reviews':
                return $this->changeReviewsColumns($input);
            default:
                break;
        }
    }

    /**
     * @param $input
     */
    private function changeReviewsColumns($input)
    {
        if (!isset($input['search'])) {
            return $input;
        }

        $columns = [
            'msp' => 'products.prd_cd',
            'tsp' => 'bookings.booked_pro_name',
            'tnd' => 'customers.first_name',
            'ngay' => 'review_date',
            'nd' => 'review_content',
            'tl' => 'review_rate'
        ];

        $newInput = [];
        foreach (explode(';', $input['search']) as $item) {
            [$key, $value] = explode(':', $item);
            $newInput[$columns[$key]] = $value;
        }

        dd($newInput);
        //return
    }
}
