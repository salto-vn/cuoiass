<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReviewController extends ApiController
{

    protected $apiName = "reviews";

    /**
     * Display Reviews list screen
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function initial(Request $request) {

        $params = array_filter($request->input());
        $params['review_response_vendor_id'] = '1'; //TODO;
        $params['vendor_id'] = '1'; //TODO;
        $response = $this->api->requestNoCache($this->apiName, "GET", $params);
        return response()->json(
            json_decode($response->getBody()),
            $response->getStatusCode()
        );
    }

    public function show(Request $request) {
        $params = array_filter($request->input());
        $params['review_response_vendor_id'] = '1'; //TODO;
        $params['vendor_id'] = '1'; //TODO;
        $params['review_id'] = $request->review_id; //TODO;
        $routeName = str_replace('controller' . '/', '', $request->path());
        $response = $this->api->requestNoCache($routeName, "GET", $params);
        return response()->json(
            json_decode($response->getBody()),
            $response->getStatusCode()
        );
    }

    /** Answer a review
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory
     */
    public function update(Request $request)
    {
        //Call Update Review API
        $params = array_filter($request->input());
        $params['review_response_vendor_id'] = '1'; //TODO;
        $params['vendor_id'] = '1'; //TODO;
        $response = $this->api->requestNoCache($this->apiName, "PUT", $params);
        return response()->json(
            json_decode($response->getBody()),
            $response->getStatusCode()
        );
    }

}
