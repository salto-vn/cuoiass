<?php
/**
 * Created by PhpStorm.
 * Email: 'ngotuananh2606@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\BookedDrink;
use App\Utils\TableName as TBL;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class BookingDrinkRepo
 *
 * @property BookedDrink $model
 * @method BookedDrink create(array $attributes)
 */
class BookingDrinkRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = BookedDrink::class;
        return $this->model;
    }

    /**
     * @param $bookedId
     * @return Collection|static[]
     */
    public function getBookingDrinksByBookedId($bookedId)
    {

        $tblBookedDrink = TBL::TBL_BOOKED_DRINKS;
        $tblDrink = TBL::TBL_DRINKS;
        $query = $this->model->newQuery()->select([
            "$tblBookedDrink.booked_drink_id",  "$tblBookedDrink.booked_menu", "$tblBookedDrink.service_code", "$tblBookedDrink.booked_total",
            "$tblDrink.drink_id as id", "$tblDrink.drink_name as name", "$tblDrink.unit_price", "$tblDrink.image_ids"
        ])
            ->join($tblDrink, "$tblBookedDrink.drink_id", "=", "$tblDrink.drink_id")
            ->where("$tblBookedDrink.booked_id", "=", $bookedId);
        return $query->get();
    }


}
