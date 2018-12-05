<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class StaffController extends ApiController
{
    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory
     */
    public function initial(Request $request)
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

        //Call Roles API to get Role List
        $apiName = 'roles';
        $params = array_filter($request->input());
        $params['system_code'] = 'BACKYARD';
        $roles_rs = $client->request('GET', $apiName, [
            'json' => $params,
        ]);

        if ($roles_rs->getStatusCode() != '200') {
            return response($roles_rs->getBody(), $roles_rs->getStatusCode());
        }

        //Call Staff API to get Staff list
        //Prepare params
        $apiName = 'staffs';
        $columns = $this->staffColumns();
        $params = array_filter($request->input());
        $params['vendor_id'] = '1'; //TODO: hard data
        $input = $this->buildSearchColumn($params, $columns);
        $response = $client->request('GET', $apiName, [
            'json' => $input,
        ]);

        if ($response->getStatusCode() != '200') {
            return response($response->getBody(), $response->getStatusCode());
        }
        $rs = [
            'roles' => json_decode($roles_rs->getBody()),
            'staffs' => json_decode($response->getBody())
        ];
        return response()->json($rs);
    }


}
