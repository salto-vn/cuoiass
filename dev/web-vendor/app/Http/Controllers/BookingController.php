<?php

namespace App\Http\Controllers;

use App\Enums\ServiceCodeEnum;
use Illuminate\Http\Request;

class BookingController extends ApiController
{

    protected $apiName = "bookings";

    /**
     * Display Reviews list screen
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function initial(Request $request)
    {

        $params = array_filter($request->input());
        $params['vendor_id'] = '3'; //TODO;
        $response = $this->api->requestNoCache($this->apiName, "GET", $params);
        return response()->json(
            json_decode($response->getBody()),
            $response->getStatusCode()
        );
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $params = array_filter($request->input());
        $params['vendor_id'] = '3'; //TODO;
        $params['booked_cd'] = $request->booked_cd; //TODO;
        $routeName = str_replace('controller' . '/', '', $request->path());

        //bookings
        $bookingCols = ['status', 'booked_id', 'booked_cd', 'booked_pro_name', 'booked_size', 'booked_color'
            , 'booked_material', 'booked_style', 'booked_album_page'
            , 'booked_photo_size', 'booked_size_2', 'booked_color_2'
            , 'booked_time', 'try_date', 'activate_date'
            , 'status', 'memo', 'booked_date', 'promotion_code'
            , 'payment_method', 'payment_name', 'payment_phone', 'payment_email'
            , 'net_price', 'gross_price', 'invoice_url'
        ];
        $customerCols = ['first_name', 'last_name', 'phone', 'address'];
        $productCols = ['prd_cd', 'prd_name', 'prd_desc', 'prd_images', 'service_code'];
        $planCols = ['plan_date', 'org_date', 'gr_name', 'br_name', 'org_address'];
        $serviceCols = ['vendor_id', 'service_code', 'ven_serv_name', 'add_service', 'city', 'phone_service'];
        $promotionCols = ['promotion_title', 'promotion_code', 'start_date', 'end_date', 'promotion_type', 'promotion_amount'];
        $params['columns']['customers'] = $customerCols;
        $params['columns']['bookings'] = $bookingCols;
        $params['columns']['products'] = $productCols;
        $params['columns']['plans'] = $planCols;
        $params['columns']['vendor_services'] = $serviceCols;
        $params['columns']['promotions'] = $promotionCols;
        $response = $this->api->requestNoCache($routeName, "POST", $params);
        $body = json_decode($response->getBody());
        return response()->json(
            $body,
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
        $params['vendor_id'] = '3'; //TODO;
        $params['booked_cd'] = $request->booked_cd;
        $response = $this->api->requestNoCache($this->apiName, "PUT", $params);
        return response()->json(
            json_decode($response->getBody()),
            $response->getStatusCode()
        );
    }


    public function getServices(Request $request)
    {
        $params['vendor_id'] = '3'; //TODO;
        $response = $this->api->requestNoCache("services", "GET", $params);
        return response()->json(
            json_decode($response->getBody()),
            $response->getStatusCode()
        );
    }

    /**
     * get Menus
     * @param Request $request (service_code)
     */
    public function getMenus(Request $request) {
        //Call Update Review API
        $params = array_filter($request->input());
        $params['vendor_id'] = '3'; //TODO;vendor_id will be get on auth
        $menus = $this->api->requestNoCache('menus', "GET", $params);
        return response()->json(
            json_decode($menus->getBody()),
            $menus->getStatusCode()
        );
    }
}
