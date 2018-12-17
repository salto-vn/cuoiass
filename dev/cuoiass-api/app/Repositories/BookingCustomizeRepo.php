<?php
/**
 * Created by PhpStorm.
 * Email: 'ngotuananh2606@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\BookedCustomizeField;
use App\Utils\TableName as TBL;

/**
 * Class BookingCustomizeRepo
 *
 * @property BookedCustomizeField $model
 * @method BookedCustomizeField create(array $attributes)
 */
class BookingCustomizeRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = BookedCustomizeField::class;
        return $this->model;
    }


    public function getBookedCusFldsByBookedId($bookedId) {
        $tblCustomizeField = TBL::TBL_CUSTOMIZE_FIELDS;
        $tblBookingCusFld = TBL::TBL_BOOKED_CUSTOMIZE_FIELDS;

        $query = $this->model->newQuery()->select([
                "$tblBookingCusFld.customize_field_answer"
                ,"$tblCustomizeField.customize_field_id"
                ,"$tblCustomizeField.customize_field_name",
                "$tblCustomizeField.customize_field_type"
                ,"$tblCustomizeField.customize_field_value"
            ])->join("$tblCustomizeField","$tblBookingCusFld.customize_field_id","=","$tblCustomizeField.customize_field_id")
        ->where("$tblBookingCusFld.booked_id","=",$bookedId);
        return $query->get();
    }

}
