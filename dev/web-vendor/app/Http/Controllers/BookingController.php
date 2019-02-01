<?php

namespace App\Http\Controllers;

use App\Enums\ServiceCodeEnum;
use Carbon\Carbon;
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
    public function initial(Request $request)
    {

        $params = array_filter($request->input());
        $params['vendor_id'] = $this->userAuth['vendor_id']; //TODO;
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
        $params['vendor_id'] = $this->userAuth['vendor_id']; //TODO;
        $params['booked_cd'] = $request->booked_cd; //TODO;
        $response = $this->getBookingDetail($params);
        //bookings
//        $bookingCols = ['status', 'booked_id', 'booked_cd', 'booked_pro_name', 'booked_size', 'booked_color'
//            , 'booked_material', 'booked_style', 'booked_album_page'
//            , 'booked_photo_size', 'booked_size_2', 'booked_color_2'
//            , 'booked_time', 'try_date', 'activate_date'
//            , 'status', 'memo', 'booked_date', 'promotion_code'
//            , 'payment_method', 'payment_name', 'payment_phone', 'payment_email'
//            , 'net_price', 'gross_price', 'invoice_url'
//        ];
//        $customerCols = ['customer_id', 'first_name', 'last_name', 'phone', 'address'];
//        $productCols = ['prd_id', 'prd_cd', 'prd_name', 'prd_desc', 'prd_images', 'service_code'];
//        $planCols = ['plan_id', 'plan_date', 'org_date', 'gr_name', 'br_name', 'org_address'];
//        $serviceCols = ['vendor_id', 'vendor_service_id','service_code', 'ven_serv_name', 'add_service', 'city', 'phone_service'];
//        $promotionCols = ['promotion_title', 'promotion_code', 'start_date', 'end_date', 'promotion_type', 'promotion_amount'];
//        $params['columns']['customers'] = $customerCols;
//        $params['columns']['bookings'] = $bookingCols;
//        $params['columns']['products'] = $productCols;
//        $params['columns']['plans'] = $planCols;
//        $params['columns']['vendor_services'] = $serviceCols;
//        $params['columns']['promotions'] = $promotionCols;
//        $response = $this->api->requestNoCache($this->apiName . "/" . $params['booked_cd'], "POST", $params);
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
        //Call Update Booking API
        $params = array_filter($request->input());
        $params['vendor_id'] = $this->userAuth['vendor_id']; //TODO;
        $params['booked_cd'] = $request->booked_cd;

        //repair parameters
        $params['booked_time'] = Carbon::parse($params['booked_time'])->format('H:i:s');
        if (!empty($params['try_date']) && !empty($params['try_date_time'])) {
            $params['try_date'] = join(" ",
                [Carbon::parse($params['try_date'])->format('Y-m-d')
                    , Carbon::parse($params['try_date_time'])->format('H:i:s')]);
        }

        if (!empty($params['activate_date']) && !empty($params['activate_date_time'])) {
            $params['activate_date'] = join(" ",
                [Carbon::parse($params['activate_date'])->format('Y-m-d')
                    , Carbon::parse($params['activate_date_time'])->format('H:i:s')]);
        }

        if (!empty($params['plan']['org_date']) && !empty($params['plan']['org_date_time'])) {
            $params['plan']['org_date'] = join(" ",
                [Carbon::parse($params['plan']['org_date'])->format('Y-m-d')
                    , Carbon::parse($params['plan']['org_date_time'])->format('H:i:s')]);
        }
        if (isset($params['options'])) {
            $news = [];
            $updates = [];
            $deletes = [];
            foreach ($params['options'] as $option) {
                $action = isset($option['action']) ? $option['action']: '';
                switch ($action) {
                    case "NEW":
                        $news[] = [
                            "option_quality" => $option["option_quality"]
                            , "option_id"=>$option["option_id"]
                            , "prd_id"=>$params["product"]["prd_id"]
                            , "vendor_service_id"=>$params["vendor_service"]["vendor_service_id"]
                            , "booked_id"=>$params["booked_id"]];
                        break;
                    case "UPD":
                        $updates[] = [
                            "option_quality" => $option["option_quality"]
                            , "booked_opt_id"=> isset($option["booked_opt_id"]) ? $option["booked_opt_id"] : ""
                        ];
                        break;
                    case "DEL":
                        if (!empty($option["booked_opt_id"])) $deletes[] = $option["booked_opt_id"] ;
                        break;
                    default:
                        break;
                }
            }
            unset($params['options']);
            $params['options']['news'] = $news;
            $params['options']['updates'] = $updates;
            $params['options']['deletes'] = $deletes;
        }
        $response = $this->api->requestNoCache($this->apiName, "PUT", $params);
        if ($response->getStatusCode() == 200){
            $sel_params['vendor_id'] = $this->userAuth['vendor_id']; //TODO;
            $sel_params['booked_cd'] = $request->booked_cd;
            $bk_detail = $this->getBookingDetail($sel_params);
            return response()->json(
                json_decode($bk_detail->getBody()),
                $bk_detail->getStatusCode()
            );
        } else {
            return response()->json(
                json_decode($response->getBody()),
                $response->getStatusCode()
            );
        }


    }


    public function getServices(Request $request)
    {
        $params['vendor_id'] = $this->userAuth['vendor_id']; //TODO;
        $response = $this->api->requestNoCache("services", "GET", $params);
        return response()->json(
            json_decode($response->getBody()),
            $response->getStatusCode()
        );
    }

    /**
     * get Menus
     * @param Request $request (service_code)
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMenus(Request $request)
    {
        //Call Menu API
        $params = array_filter($request->input());
        $params['vendor_id'] = $this->userAuth['vendor_id']; //TODO;vendor_id will be get on auth
        $menus = $this->api->requestNoCache('menus', "GET", $params);
        return response()->json(
            json_decode($menus->getBody()),
            $menus->getStatusCode()
        );
    }

    public function getOptions(Request $request)
    {
        //Call Option API
        $params = array_filter($request->input());
        $params['vendor_id'] = $this->userAuth['vendor_id']; //TODO;vendor_id will be get on auth
        $menus = $this->api->requestNoCache('options', "GET", $params);
        return response()->json(
            json_decode($menus->getBody()),
            $menus->getStatusCode()
        );
    }


    private function getBookingDetail(&$params) {
        //bookings
        $bookingCols = ['status', 'booked_id', 'booked_cd', 'booked_pro_name', 'booked_size', 'booked_color'
            , 'booked_material', 'booked_style', 'booked_album_page'
            , 'booked_photo_size', 'booked_size_2', 'booked_color_2'
            , 'booked_time', 'try_date', 'activate_date'
            , 'status', 'memo', 'booked_date', 'promotion_code'
            , 'payment_method', 'payment_name', 'payment_phone', 'payment_email'
            , 'net_price', 'gross_price', 'invoice_url'
        ];
        $customerCols = ['customer_id', 'first_name', 'last_name', 'phone', 'address'];
        $productCols = ['prd_id', 'prd_cd', 'prd_name', 'prd_desc', 'prd_images', 'service_code'];
        $planCols = ['plan_id', 'plan_date', 'org_date', 'gr_name', 'br_name', 'org_address'];
        $serviceCols = ['vendor_id', 'vendor_service_id','service_code', 'ven_serv_name', 'add_service', 'city', 'phone_service'];
        $promotionCols = ['promotion_title', 'promotion_code', 'start_date', 'end_date', 'promotion_type', 'promotion_amount'];
        $params['columns']['customers'] = $customerCols;
        $params['columns']['bookings'] = $bookingCols;
        $params['columns']['products'] = $productCols;
        $params['columns']['plans'] = $planCols;
        $params['columns']['vendor_services'] = $serviceCols;
        $params['columns']['promotions'] = $promotionCols;
        $response = $this->api->requestNoCache($this->apiName . "/" . $params['booked_cd'], "POST", $params);
        return $response;
    }
}
