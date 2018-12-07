<?php
/**
 * Created by PhpStorm.
 * Email: 'ngotuananh2606@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Review;
use App\Utils\TableName;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class ReviewRepo extends Repository
{
    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        return Review::class;
    }

    /**
     * @param $search
     * @param $offset
     * @param $limit
     * @param $orderBy
     * @param $sortBy
     * @param $columns
     * @return mixed
     */
    public function getList($search, $offset, $limit, $orderBy, $sortBy, $columns)
    {
        return $this->list($search, $offset, $limit, $orderBy, $sortBy, $columns);
    }

    /**
     * @param $search search=email:abc@Gmai.com;ten:duy
     * @param $page
     * @param $limit
     * @param $orderBy
     * @param $order
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getListAllData($search, $page, $limit, $orderBy, $order)
    {
        $fieldsSearchable = [
            'review_id', 'review_content', 'review_date',
            'review_rate', 'bookings.booked_pro_name', 'products.prd_cd',
            'customers.first_name', 'customers.last_name'
        ];
        $tblReview = TableName::TBL_REVIEWS;
        $tblBooking = TableName::TBL_BOOKINGS;
        $tblCustomer = TableName::TBL_CUSTOMERS;
        $tblProduct = TableName::TBL_PRODUCTS;
        $limit = (int)$limit > 0 ? $limit : \Constant::MIN_LIMiT;
        $order = ($order === \Constant::ORDER_BY_DESC) ? $order : \Constant::ORDER_BY_ASC;
        $model = $this->model->newQuery()->select([
            "$tblReview.review_id", "$tblReview.review_content", "$tblReview.review_date",
            "$tblReview.review_rate", "$tblReview.review_imgs",
            "$tblBooking.booked_cd", "$tblBooking.booked_pro_name", "$tblProduct.prd_cd",
            "$tblCustomer.first_name", "$tblCustomer.last_name"
        ])
            ->join("$tblBooking", "$tblReview.booked_id", '=', "$tblBooking.booked_id")
            ->join("$tblCustomer", "$tblReview.customer_id", '=', "$tblCustomer.customer_id")
            ->join("$tblProduct", "$tblReview.prd_id", '=', "$tblProduct.prd_id");
        if ($search && is_array($fieldsSearchable) && count($fieldsSearchable)) {
            $searchData = $this->parserSearchData($search);
            if ($searchData) {
                foreach ($searchData as $field => $value) {
                    if (!in_array($field, $fieldsSearchable)) {
                        continue;
                    }
                    if ($field == "review_date") {
                        if (!empty($value)) {
                            $model->whereDate($field, '=', $value);
                        }
                    } else if ($field == "$tblCustomer.first_name") {
                        $value = addslashes($value);
                        if (!empty($value)) {
                            $model->where(function ($query) use ($value, $tblCustomer) {
                                $query->where("$tblCustomer.last_name", "like", "%{$value}%")
                                    ->orWhere("$tblCustomer.first_name", 'like', "%{$value}%");
                            });
                        }
                    } else if ($field == "review_rate") {
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
            $model->orderBy($orderBy, $order);
        }
        return $model->paginate($limit, null, null, $page);
    }


}
