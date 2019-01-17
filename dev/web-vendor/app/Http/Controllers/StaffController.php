<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StaffController extends ApiController
{

    protected $apiName = "staffs";

    /**
     * Get Roles and Staffs for Staff List screen
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory
     */
    public function initial(Request $request)
    {

        //Call Roles API to get Role List
        $params = array_filter($request->input());
        $params['system_code'] = 'BACKYARD';
        $roles_rs = $this->api->request("roles", "GET", $params);

        //Call Staff API to get Staff list
        //Prepare params
        if (!empty($roles_rs)) {
            $columns = $this->staffColumns();
            $params = array_filter($request->input());
            $params['vendor_id'] = $this->userAuth['vendor_id']; //TODO: hard data
            $input = $this->buildSearchColumn($params, $columns);
            $response = $this->api->requestNoCache($this->apiName, "GET", $input);
        }
        $rs = [
            "roles" => json_decode($roles_rs->getBody()),
            "staffs" => json_decode($response->getBody()),
        ];
        return response()->json($rs, $response->getStatusCode());
    }


    /**
     * Get a request
     * @param Request $request
     * @return mixed
     */
    public function show(Request $request)
    {

        $input = array_filter($request->input());
        $input['vendor_id'] = $this->userAuth['vendor_id']; //TODO: hard data
        $input['staff_id'] = $request->staff_id;//TODO: hard data
        $routeName = str_replace('controller' . '/', '', $request->path());
        $response = $this->api->requestNoCache($routeName, "GET", $input);
        $rs = json_decode($response->getBody());
        return response()->json($rs,$response->getStatusCode());
    }


    public function update(Request $request)
    {

        $input = array_filter($request->input());
        $input['vendor_id'] = $this->userAuth['vendor_id']; //TODO: hard data
        $input['staff_id'] = $request->staff_id;//TODO: hard data
        $routeName = str_replace('controller' . '/', '', $request->path());
        $response = $this->api->requestNoCache($routeName, "PUT", $input);
        $rs = json_decode($response->getBody());
        return response()->json($rs, $response->getStatusCode());
    }

    public function store(Request $request)
    {
        $input = array_filter($request->input());
        $input['vendor_id'] = $this->userAuth['vendor_id']; //TODO: hard data
        $routeName = str_replace('controller' . '/', '', $request->path());
        $response = $this->api->requestNoCache($routeName, "POST", $input);
        $rs = json_decode($response->getBody());
        return response()->json($rs, $response->getStatusCode());
    }

    public function destroy(Request $request)
    {
        $input = array_filter($request->input());
        $input['vendor_id'] = $this->userAuth['vendor_id']; //TODO: hard data
        $input['staff_id'] = $request->staff_id;
        $routeName = str_replace('controller' . '/', '', $request->path());
        $response = $this->api->requestNoCache($routeName, "DELETE", $input);
        $rs = json_decode($response->getBody());
        return response()->json($rs, $response->getStatusCode());
    }

}
