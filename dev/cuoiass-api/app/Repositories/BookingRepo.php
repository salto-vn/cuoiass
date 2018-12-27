<?php
/**
 * Created by PhpStorm.
 * Email: 'ngotuananh2606@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Booking;
use App\Utils\TableName as TBL;

/**
 * Class BookingRepo
 *
 * @property Booking $model
 * @method Booking create(array $attributes)
 */
class BookingRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = Booking::class;
        return $this->model;
    }

    /**
     * @param $search
     * @param $page
     * @param $limit
     * @param $orderBy
     * @param $order
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getListBookingByVendor($search, $page, $limit, $orderBy, $order)
    {
        $fieldsSearchable = [
            'booked_cd', 'booked_pro_name', 'booked_date'
            , 'try_date', 'activate_date', 'status'
            , 'customer_name', 'service_code'
        ];
        $tblBooking = TBL::TBL_BOOKINGS;
        $tblCustomer = TBL::TBL_CUSTOMERS;
        $tblPlan = TBL::TBL_PLANS;
        $tblVendorSvrs = TBL::TBL_VENDOR_SERVICES;
        $limit = (int)$limit > 0 ? $limit : \Constant::MIN_LIMiT;
        $order = ($order === \Constant::ORDER_BY_DESC) ? $order : \Constant::ORDER_BY_ASC;
        $model = $this->model->newQuery()->select([
            "$tblVendorSvrs.service_code",
            "$tblBooking.booked_cd", "$tblBooking.booked_pro_name", "$tblBooking.booked_date",
            "$tblBooking.try_date", "$tblBooking.activate_date", "$tblBooking.status",
            "$tblCustomer.first_name", "$tblCustomer.last_name"
        ])
            ->join("$tblPlan", "$tblBooking.plan_id", '=', "$tblPlan.plan_id")
            ->join("$tblVendorSvrs", "$tblBooking.vendor_service_id", '=', "$tblVendorSvrs.vendor_service_id")
            ->join("$tblCustomer", "$tblPlan.customer_id", '=', "$tblCustomer.customer_id");
        if ($search && is_array($fieldsSearchable) && count($fieldsSearchable)) {
            $searchData = $this->parserSearchData($search);
            if ($searchData) {
                foreach ($searchData as $field => $value) {
                    if (!in_array($field, $fieldsSearchable)) {
                        continue;
                    }
                    if (in_array($field, ['booked_date', 'try_date', 'activate_date'])) {
                        if (!empty($value)) {
                            $value = Carbon::parse($value)->format('Y-m-d');
                            $model->whereDate($field, '=', "{$value}");
                        }
                    } else if ($field == "customer_name") {
                        $value = addslashes($value);
                        if (!empty($value)) {
                            $model->where(function ($query) use ($value, $tblCustomer) {
                                $query->where("$tblCustomer.last_name", "like", "%{$value}%")
                                    ->orWhere("$tblCustomer.first_name", 'like', "%{$value}%");
                            });
                        }
                    } else if ($field == "status" || $field == "booked_cd" || $field == "service_code") {
                        $value = addslashes($value);
                        if (isset($value)) {
                            $model->where($field, '=', "{$value}");
                        }
                    } else {
                        $value = addslashes($value);
                        if (!empty($value)) {
                            $model->where($field, 'like', "%{$value}%");
                        }
                    }

                }
            }
        }
        if (!empty($orderBy)) {
            if ($orderBy == 'customer_name') {
                $model->orderBy('first_name', $order);
            } else {
                $model->orderBy($orderBy, $order);
            }

        }
        return $model->paginate($limit, null, null, $page);
    }

    /**
     * Get Booking info(Product, Customer, Booking, Plan info)
     * @param $booked_cd
     * @param $tableCols :json {table1:"col1,col2,col3", table2:"col1,col2,col3"}
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getBookingByCd($booked_cd, $tableCols)
    {
        $tblBooking = TBL::TBL_BOOKINGS;
        $tblCustomer = TBL::TBL_CUSTOMERS;
        $tblPlan = TBL::TBL_PLANS;
        $tblProduct = TBL::TBL_PRODUCTS;
        $tblVendorService = TBL::TBL_VENDOR_SERVICES;

        //Build columns search
        $planCols = [];
        $bookingCols = [];
        $customerCols = [];
        $productCols = [];
        $vendorServiceCols = [];

        $planFlg = isset($tableCols[$tblPlan]) ? true : false;
        $bookingFlg = isset($tableCols[$tblBooking]) ? true : false;
        $customerFlg = isset($tableCols[$tblCustomer]) ? true : false;
        $productFlg = isset($tableCols[$tblProduct]) ? true : false;
        $vendorServiceFlg = isset($tableCols[$tblVendorService]) ? true : false;

        // Plan columns
        if ($planFlg) {
            $planCols = array_map(function ($col) use ($tblPlan) {
                return "$tblPlan.$col";
            }, $tableCols[$tblPlan]);
        }

        // Booking columns
        if ($bookingFlg) {
            $bookingCols = array_map(function ($col) use ($tblBooking) {
                return "$tblBooking.$col";
            }, $tableCols[$tblBooking]);
        }

        // Customer columns
        if ($customerFlg && $planFlg) {
            $customerCols = array_map(function ($col) use ($tblCustomer) {
                return "$tblCustomer.$col";
            }, $tableCols[$tblCustomer]);

        }

        // Product columns
        if ($productFlg) {
            $productCols = array_map(function ($col) use ($tblProduct) {
                return "$tblProduct.$col";
            }, $tableCols[$tblProduct]);

        }

        // Vendor service columns
        if ($vendorServiceFlg) {
            $vendorServiceCols = array_map(function ($col) use ($tblVendorService) {
                return "$tblVendorService.$col";
            }, $tableCols[$tblVendorService]);
        }


        //Default col
        $defaultCols = ["$tblProduct.service_code","$tblBooking.promotion_code","$tblBooking.booked_id","$tblProduct.prd_images"];

        //Merge all Columns
        $selectCols = array_merge($defaultCols, $planCols, $bookingCols, $customerCols, $productCols, $vendorServiceCols);
        $query = $this->model->newQuery()->select($selectCols);

        if ($planFlg) {
            $query->join("$tblPlan", "$tblBooking.plan_id", "=", "$tblPlan.plan_id");
        }

        if ($customerFlg) {
            $query->join("$tblCustomer", "$tblPlan.customer_id", "=", "$tblCustomer.customer_id");
        }

        if ($productFlg) {
            $query->join("$tblProduct", function ($join) use ($tblProduct, $tblBooking) {
                $join->on("$tblBooking.prd_id", '=', "$tblProduct.prd_id");
                $join->on("$tblBooking.vendor_service_id", '=', "$tblProduct.vendor_service_id");
            });
        }
        if ($vendorServiceFlg) {
            $query->join("$tblVendorService", function ($join) use ($tblBooking, $tblVendorService) {
                $join->on("$tblBooking.vendor_service_id", '=', "$tblVendorService.vendor_service_id");
            });
        }


        $query->where('booked_cd', '=', $booked_cd);
        return $query->first();
    }


}
