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
use Carbon\Carbon;

/**
 * Class StaffRepo
 *
 * @property Staff $model
 * @method Staff create(array $attributes)
 */
class BookingRepo extends Repository
{
    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        return Booking::class;
    }

    /**
     * @param $search
     * @param $page
     * @param $limit
     * @param $orderBy
     * @param $sortBy
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getListBookingbyVendor($search, $page, $limit, $orderBy, $order)
    {
        $fieldsSearchable = [
            'booked_cd', 'booked_pro_name', 'booked_date'
            ,'try_date', 'activate_date','status'
            , 'customer_name'
        ];
        $tblBooking = TBL::TBL_BOOKINGS;
        $tblCustomer = TBL::TBL_CUSTOMERS;
        $tblPlan = TBL::TBL_PLANS;
        $limit = (int)$limit > 0 ? $limit : \Constant::MIN_LIMiT;
        $order = ($order === \Constant::ORDER_BY_DESC) ? $order : \Constant::ORDER_BY_ASC;
        $model = $this->model->newQuery()->select([
            "$tblBooking.booked_cd", "$tblBooking.booked_pro_name", "$tblBooking.booked_date",
            "$tblBooking.try_date", "$tblBooking.activate_date", "$tblBooking.status",
            "$tblCustomer.first_name", "$tblCustomer.last_name"
            ])
            ->join("$tblPlan", "$tblBooking.plan_id", '=', "$tblPlan.plan_id")
            ->join("$tblCustomer", "$tblPlan.customer_id", '=', "$tblCustomer.customer_id");
        if ($search && is_array($fieldsSearchable) && count($fieldsSearchable)) {
            $searchData = $this->parserSearchData($search);
            if ($searchData) {
                foreach ($searchData as $field => $value) {
                    if (!in_array($field, $fieldsSearchable)) {
                        continue;
                    }
                    if (in_array($field,['booked_date', 'try_date','activate_date'])) {
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
                    } else if ($field == "status" || $field == "booked_cd") {
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
            if($orderBy == 'customer_name') {
                $model->orderBy('first_name', $order);
            } else {
                $model->orderBy($orderBy, $order);
            }

        }
        return $model->paginate($limit, null, null, $page);
    }

}
