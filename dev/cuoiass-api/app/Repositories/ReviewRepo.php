<?php
/**
 * Created by PhpStorm.
 * Email: 'ngotuananh2606@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Review;

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

    public function getListAllData($search, $offset, $limit, $orderBy, $sortBy)
    {
        $fieldsSearchable = $this->model->getFillable();
        $offset = (int)$offset ? $offset : \Constant::MIN_OFFSET;
        $limit = (int)$limit ? $limit : \Constant::MIN_LIMiT;
        $sortBy = ($sortBy === \Constant::ORDER_BY_DESC) ? $sortBy : \Constant::ORDER_BY_ASC;
        $model = $this->model->newQuery()->select([
            'reviews.review_id', 'reviews.review_content', 'reviews.review_date',
            'reviews.review_rate', 'reviews.review_imgs',
            'bookings.booked_cd', 'bookings.booked_pro_name',
            'customers.first_name', 'customers.last_name'
        ])->join('bookings','reviews.booked_id','=','bookings.booked_id')
        ->join('customers','reviews.customer_id','=','customers.customer_id');
        if ($search && is_array($fieldsSearchable) && count($fieldsSearchable)) {
            $searchData = $this->parserSearchData($search);
            if ($searchData) {
                foreach ($searchData as $field => $value) {
                    if (!in_array($field, $fieldsSearchable)) {
                        continue;
                    }
                    $value = addslashes($value);
                    $model->where($field, 'like', "%{$value}%");
                }
            }
        }

        $model->skip($offset)->take($limit);


        if (!empty($orderBy)) {
            $model->orderBy($orderBy, $sortBy);
        }

        return $model->get();
    }
}
