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

        $routeName = str_replace(config('wedding.api_prefix') . '/', '', $request->path());
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
        //TODO HARD CODE Vendor ID
        $params['vendor_id'] = '1';

        switch (trim($apiName, '/')) {
            case 'reviews':
                $columns = $this->reviewColumns();
                $params['review_response_vendor_id'] = '1'; //TODO;
                return $this->buildSearchColumn($params, $columns);
            case 'staffs':
                $columns = $this->staffColumns();
                return $this->buildSearchColumn($params, $columns);
            case 'roles':
                if (!isset($params['system_code'])) {
                    $params['system_code'] = 'BACKYARD';
                }
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
            $strParam .= $columns[$key] . ':' . $value . ';';
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
            'filter_prd_cd' => 'products.prd_cd',
            'filter_booked_pro_name' => 'bookings.booked_pro_name',
            'filter_customer_name' => 'customers.first_name',
            'filter_review_date' => 'review_date',
            'filter_review_content' => 'review_content',
            'filter_review_rate' => 'review_rate',
            'review_id' => 'review_id',
        ];
    }

    /**
     *
     * @return array
     */
    public function staffColumns()
    {
        return [
            'staff_id' => 'staff_id',
            'filter_staff_name' => 'staff_name',
            'filter_phone' => 'phone',
            'filter_email' => 'email',
            'filter_address' => 'address',
            'filter_role_name' => 'role_id'
        ];
    }


}
