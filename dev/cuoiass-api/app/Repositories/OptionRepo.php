<?php
/**
 * Created by PhpStorm.
 * Email: 'Anh'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;

use App\Models\Option;
use App\Utils\TableName;

/**
 * Class MenuRepo
 *
 * @property Option $model
 * @method Option create(array $attributes)
 */
class OptionRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = Option::class;
        return $this->model;
    }

    /**
     * @param $vendor_id
     * @param $prd_id
     * @param $search
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getOptionsByPrdID($vendor_id, $prd_id, $search)
    {
        $imageRepo = new ImageRepo();
        $fieldsSearchable = ['option_name'];
        $tblVendorService = TableName::TBL_VENDOR_SERVICES;
        $tblOption = TableName::TBL_OPTIONS;
        $selCols = ["option_id as id", "option_name as name", "option_price as unit_price", "image_ids"];
        $options = $this->model->newQuery()
            ->select($selCols)
            ->join("$tblVendorService", "$tblOption.vendor_service_id", "=", "$tblVendorService.vendor_service_id")
            ->where("$tblVendorService.vendor_id", "=", $vendor_id)
            ->where("$tblOption.prd_id", "=", $prd_id);
        if ($search && is_array($fieldsSearchable) && count($fieldsSearchable)) {
            $searchData = $this->parserSearchData($search);
            if ($searchData) {
                foreach ($searchData as $field => $value) {
                    if (!in_array($field, $fieldsSearchable)) {
                        continue;
                    }

                    $value = addslashes($value);
                    if (!empty($value)) {
                        $options->where("$tblOption.$field", 'like', "%{$value}%");
                    }

                }
            }
        }
        $options->orderBy("name", 'asc');
        $rs = $options->get()
            ->map(function ($option) use ($imageRepo) {
                $images = explode(",", trim($option['image_ids']));
                $option['images'] = $imageRepo->findByIds($images);
                unset($option['image_ids']);
                return $option;
            });

        return $rs;
    }
}
