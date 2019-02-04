<?php
/**
 * Created by PhpStorm.
 * Email: 'ngotuananh2606@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\BookedCustomizeField;
use App\Models\BookedDrink;
use App\Models\BookedFood;
use App\Models\BookedOption;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\Plan;
use App\Utils\TableName as TBL;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
    public function getListBookingByVendor($vendor_id, $search, $page, $limit, $orderBy, $order)
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
        $model->where("$tblVendorSvrs.vendor_id", '=', $vendor_id);
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
     * @param $vendor_id
     * @param $booked_cd
     * @param $tableCols :json {table1:"col1,col2,col3", table2:"col1,col2,col3"}
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getBookingByCd($vendor_id, $booked_cd, $tableCols)
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
        $defaultCols = ["$tblProduct.service_code", "$tblBooking.promotion_code", "$tblBooking.booked_id", "$tblProduct.prd_images"];

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
        $query->where("$tblVendorService.vendor_id", '=', $vendor_id);
        return $query->first();
    }


    public function updateByBookCd($booked_cd, $input)
    {
        DB::transaction(function () use ($booked_cd, $input) {
            //Update table Booking
            $updateBkCol = ["booked_size", "booked_color", "booked_material", "booked_style", "booked_album_page"
                , "booked_photo_size", "booked_size_2", "booked_color_2", "booked_time", "try_date", "activate_date"
                , "status", "memo", "promotion_code", "payment_method", "payment_name", "payment_phone", "payment_email"
                , "net_price", "gross_price", "invoice_url"];
            $updt_params = $this->createUpdateColByName($updateBkCol, $input);
            $this->model->newQuery()
                ->where('booked_cd', "=", $booked_cd)
                ->update($updt_params);

            //update table Plan
            $updatePlnCols = ["gr_name", "br_name", "org_address", "org_date"];
            $plan_id = $input['plan']['plan_id'];
            $updt_params = $this->createUpdateColByName($updatePlnCols, $input['plan']);
            Plan::query()->where("plan_id", "=", $plan_id)
                ->update($updt_params);

            //Update booked_customize_fields
            if (isset($input['customize_fields'])) {
                array_map(function ($cus_field) {
                    $booked_cus_field_id = $cus_field['booked_cus_field_id'];
                    $updt_params = $this->createUpdateColByName(["customize_field_answer"], $cus_field);
                    BookedCustomizeField::query()->where("booked_cus_field_id", "=", $booked_cus_field_id)
                        ->update($updt_params);
                }, $input['customize_fields']);

            }

            //Update booked_options
            if (isset($input['options'])) {
                Log::debug(print_r($input['options'],true));
                if (!empty($input['options']['deletes'])) {
                    BookedOption::withTrashed()
                        ->whereIn("booked_opt_id", $input['options']['deletes'])
                        ->delete();
                }

                if (!empty($input['options']['news'])) {
                    foreach ($input['options']['news'] as $option) {
                        $restored = BookedOption::withTrashed()
                            ->where("booked_id","=", $option['booked_id'])
                            ->where("option_id","=", $option['option_id'])
                            ->where("prd_id","=", $option['prd_id'])
                            ->where("vendor_service_id","=", $option['vendor_service_id'])
                            ->restore();
                        if ($restored) {
                            $updt_params = $this->createUpdateColByName(["option_quality"], $option);
                            BookedOption::query()
                                ->where("booked_id","=", $option['booked_id'])
                                ->where("option_id","=", $option['option_id'])
                                ->where("prd_id","=", $option['prd_id'])
                                ->where("vendor_service_id","=", $option['vendor_service_id'])
                                ->update($updt_params);
                        } else {
                            BookedOption::query()->insert($option);
                        }
                    }
                }

                if (!empty($input['options']['updates'])) {
                    foreach ($input['options']['updates'] as $option) {
                        $updt_params = $this->createUpdateColByName(["option_quality"], $option);
                        BookedOption::query()
                            ->where("booked_opt_id","=",$option['booked_opt_id'])
                            ->update($updt_params);
                    }
                }
            }

            //Update booked_foods
            if (isset($input['foods'])) {
                $updateBkFoods = ["booked_menu", "menu_id", "food_id", "booked_total"];
                array_map(function ($food) use ($updateBkFoods) {
                    $updt_params = $this->createUpdateColByName($updateBkFoods, $food);
                    BookedFood::query()->where("booked_food_id", "=", $food['booked_food_id'])
                        ->update($updt_params);
                }, $input['foods']);

            }

            //Update booked_drinks
            if (isset($input['drinks'])) {
                $updateBkDrinks = ["booked_menu", "menu_id", "drink_id", "booked_total"];
                array_map(function ($drink) use ($updateBkDrinks) {
                    $updt_params = $this->createUpdateColByName($updateBkDrinks, $drink);
                    BookedDrink::query()->where("booked_drink_id", "=", $drink['booked_drink_id'])
                        ->update($updt_params);
                }, $input['drinks']);
            }
        });
    }

    /**
     * @param $cols Column name
     * @param $datas request input
     * @return array
     */
    private function createUpdateColByName($cols, $datas)
    {
        $rs = [];
        foreach ($cols as $col) {
            if (isset($datas[$col])) {
                $rs[$col] = $datas[$col];
            }
        }
        return $rs;
    }
}
