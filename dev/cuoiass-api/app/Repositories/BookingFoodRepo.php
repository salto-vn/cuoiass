<?php
/**
 * Created by PhpStorm.
 * Email: 'ngotuananh2606@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\BookedFood;
use App\Utils\TableName as TBL;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class BookingOptionRepo
 *
 * @property BookedFood $model
 * @method BookedFood create(array $attributes)
 */
class BookingFoodRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = BookedFood::class;
        return $this->model;
    }

    /**
     * @param $bookedId
     * @return Collection|static[]
     */
    public function getBookingFoodsByBookedId($bookedId)
    {

        $tblBookedFood = TBL::TBL_BOOKED_FOODS;
        $tblFood = TBL::TBL_FOODS;
        $query = $this->model->newQuery()->select([
            "booked_menu", "service_code", "booked_total", "unit_price", "booked_drink", "drink_unit_price",
            "$tblFood.food_id", "$tblFood.food_name", "$tblFood.food_name",
        ])
            ->join($tblFood, "$tblBookedFood.menu_id", "=", "$tblFood.menu_id")
            ->where("$tblBookedFood.booked_id", "=", $bookedId);
        return $query->get();
    }


}
