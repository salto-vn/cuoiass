<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookingController extends ApiController
{

    protected $apiName = "bookings";

    /**
     * Display Reviews list screen
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function initial(Request $request) {

        $params = array_filter($request->input());
        $params['vendor_id'] = '1'; //TODO;
        $response = $this->api->requestNoCache($this->apiName, "GET", $params);
        return response()->json(
            json_decode($response->getBody()),
            $response->getStatusCode()
        );
    }

    public function show(Request $request) {
        $params = array_filter($request->input());
        $params['vendor_id'] = '1'; //TODO;
        $params['booked_cd'] = $request->booked_cd; //TODO;
        $routeName = str_replace('controller' . '/', '', $request->path());

        //TODO:
        //bookings
        $bookingCols = ['status','booked_cd','booked_pro_name','booked_size','booked_color'
                        , 'booked_material','booked_style', 'booked_album_page'
                        , 'booked_photo_size','booked_size_2', 'booked_color_2'
                        , 'booked_time','try_date', 'activate_date'
                        , 'status','memo', 'booked_date'
                        , 'payment_name','payment_phone', 'payment_email'
                        , 'net_price','gross_price', 'invoice_url'
                        ];
        $params['columns']['bookings'] = $bookingCols;
        $response = $this->api->requestNoCache($routeName, "POST", $params);
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
        $params['vendor_id'] = '1'; //TODO;
        $params['booked_cd'] = $request->booked_cd; //TODO;
        $response = $this->api->requestNoCache($this->apiName, "PUT", $params);
        return response()->json(
            json_decode($response->getBody()),
            $response->getStatusCode()
        );
    }

}
