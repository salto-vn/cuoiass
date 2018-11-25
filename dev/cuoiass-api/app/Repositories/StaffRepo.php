<?php
/**
 * Created by PhpStorm.
 * Email: 'hongduyphp@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Staff;
use App\Utils\TableName as TBL;

/**
 * Class StaffRepo
 *
 * @property Staff $model
 * @method Staff create(array $attributes)
 */
class StaffRepo extends Repository
{
    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        return Staff::class;
    }

    /**
     * @param $search
     * @param $page
     * @param $limit
     * @param $orderBy
     * @param $sortBy
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getListStaffByVendor($search, $page, $limit, $orderBy, $sortBy)
    {
        //$vendorId = auth()->user()->vendor_id;
        $vendorId = 1;

        $fieldsSearchable = $this->model->fieldsSearchable();
        $limit = (int)$limit > 0 ? $limit : \Constant::MIN_LIMiT;
        $sortBy = ($sortBy === \Constant::ORDER_BY_DESC) ? $sortBy : \Constant::ORDER_BY_ASC;

        $tblStaff = $this->getTable();

        $model = $this->model->newQuery();
        $model->where('vendor_id', $vendorId);

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

        $model->select([
            "$tblStaff.staff_id",
            "$tblStaff.staff_name",
            "$tblStaff.phone",
            "$tblStaff.email",
            "$tblStaff.address",
        ]);


        if (!empty($orderBy)) {
            $model->orderBy($orderBy, $sortBy);
        } else {
            $model->orderByDesc('staff_id');
        }

        return $model->paginate($limit, null, null, $page);
    }

    /**
     * @param $input
     * @return Staff
     */
    public function createWithAccount($input)
    {
        $staff = $this->create($input);
        $staff->accounts()->create($input);
        return $staff;
    }
}