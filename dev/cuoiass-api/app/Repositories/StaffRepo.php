<?php
/**
 * Created by PhpStorm.
 * Email: 'hongduyphp@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Account;
use App\Models\Staff;
use App\Until\TableName as Tbl;

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
     * @param $offset
     * @param $limit
     * @param $orderBy
     * @param $sortBy
     * @param $columns
     * @return mixed
     */
    public function getList($search, $offset, $limit, $orderBy, $sortBy, $columns)
    {
        $fieldsSearchable = $this->model->fieldsSearchable();
        $offset = (int)$offset ? $offset : \Constant::MIN_OFFSET;
        $limit = (int)$limit ? $limit : \Constant::MIN_LIMiT;
        $sortBy = ($sortBy === \Constant::ORDER_BY_DESC) ? $sortBy : \Constant::ORDER_BY_ASC;

        $tblStaff = $this->getTable();
        $tblRole = Tbl::$n['TBL_ROLES'];
        $tblAc = Tbl::$n['TBL_ACCOUNTS'];

        $model = $this->model->newQuery();
        $model->join($tblAc, "$tblAc.staff_id", '=', "$tblStaff.staff_id")
            ->join($tblRole, "$tblAc.role_id", '=', "$tblRole.role_id");

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
            "$tblStaff.address",
            "$tblAc.email",
            "$tblRole.role_name",
            "$tblRole.role_code",
            "$tblRole.system_code",
        ])->skip($offset)->take($limit);

        if (!empty($orderBy)) {
            $model->orderBy($orderBy, $sortBy);
        }

        return $model->get();
    }
}