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
            'base_uri' => config('wedding.api_url'),
            'http_errors' => false,
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
            'verify' => false
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
            case 'staffs':
                $columns = $this->staffColumns();
                return $this->buildSearchColumn($params, $columns);
            default:
                return $params;
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
        if (isset($params['orderBy'])) {
            $params['orderBy'] = $columns[$params['orderBy']];
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

    /**
     *
     * @return array
     */
    private function staffColumns()
    {
        return [
            'staff_id' => 'staff_id',
            'filter_staff_name' => 'staff_name',
            'filter_phone' => 'phone',
            'filter_email' => 'email',
            'filter_address' => 'address',
        ];
    }
}
