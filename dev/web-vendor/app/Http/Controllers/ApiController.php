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
        $baseUrl = env('API_URL', '127.0.0.1');
        $client = new Client([
            'base_uri' => $baseUrl,
            'http_errors' => false,
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
        ]);

        $routeName = str_replace(config('wedding.api_prefix').'/', '', $request->path());
        $input = $this->convertColumns($routeName, array_filter($request->input()));
        $response = $client->request($request->method(), $routeName, [
            'json' => $input,
        ]);

        return response($response->getBody(), $response->getStatusCode());
    }


    /**
     * @param $apiName
     * @param $params
     * @return mixed
     */
    private function convertColumns($apiName, $params)
    {
        switch (trim($apiName, '/')) {
            case 'reviews':
                $columns = $this->reviewColumns();
                return $this->buildSearchColumn($params, $columns);
            default:
                break;
        }
    }

    /**
     * @param $params
     * @param $columns
     * @return mixed
     */
    public function buildSearchColumn($params, $columns)
    {
        if (isset($params['sortbyc'])) {
            $params['sortbyc'] = $columns[$params['sortbyc']];
        }

        if (!isset($params['search'])) {
            return $params;
        }

        $strParam = '';
        foreach (explode(';', $params['search']) as $item) {
            [$key, $value] = explode(':', $item);
            $arrParam[$columns[$key]] = $value;
            $strParam .= $columns[$key].':'.$value.';';
        }

        $params['search'] = trim($strParam, ';');
        return $params;
    }

    /**
     *
     * @return array
     */
    private function reviewColumns()
    {
        return [
            'msp' => 'products.prd_cd',
            'tsp' => 'bookings.booked_pro_name',
            'tnd' => 'customers.first_name',
            'ngay' => 'review_date',
            'nd' => 'review_content',
            'tl' => 'review_rate',
            'review_id' => 'review_id',
        ];
    }
}
