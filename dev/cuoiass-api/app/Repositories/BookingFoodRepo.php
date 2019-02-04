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
        $tblMenu = TBL::TBL_MENUS;
        $query = $this->model->newQuery()->select([
            "$tblBookedFood.booked_food_id","$tblBookedFood.booked_menu", "$tblBookedFood.service_code", "$tblBookedFood.booked_total",
            "$tblFood.food_id as id", "$tblFood.food_name as name", "$tblFood.unit_price", "$tblFood.image_ids"
        ])
            ->join($tblFood, "$tblBookedFood.food_id", "=", "$tblFood.food_id")
            ->where("$tblBookedFood.booked_id", "=", $bookedId);
        return $query->get();
    }




}
