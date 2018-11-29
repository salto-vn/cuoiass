<?php
/**
 * Created by PhpStorm.
 * Email: 'hongduyphp@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Product;
use App\Utils\TableName as TBL;

/**
 * Class StaffRepo
 *
 * @property Product $model
 * @method Product create(array $attributes)
 */
class ProductRepo extends Repository
{
    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        return Product::class;
    }

    /**
     * @param $search
     * @param $page
     * @param $limit
     * @param $orderBy
     * @param $sortBy
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getList($search, $page, $limit, $orderBy, $sortBy)
    {
        $vendorId = 1;

        $fieldsSearchable = $this->model->fieldsSearchable();
        $limit = (int)$limit > 0 ? $limit : \Constant::MIN_LIMiT;
        $sortBy = ($sortBy === \Constant::ORDER_BY_DESC) ? $sortBy : \Constant::ORDER_BY_ASC;

        $tblProduct = $this->getTable();
        $tblVendorService = TBL::TBL_VENDOR_SERVICES;

        $model = $this->model->newQuery();

        $model->join($tblVendorService, "$tblVendorService.vendor_service_id", '=', "$tblProduct.vendor_service_id");
        $model->where("$tblVendorService.vendor_id", 1);

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

        if (!empty($orderBy)) {
            $model->orderBy($orderBy, $sortBy);
        } else {
            $model->orderByDesc('staff_id');
        }

        return $model->paginate($limit, null, null, $page);
    }
}