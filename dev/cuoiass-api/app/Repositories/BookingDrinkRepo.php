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
        $tblProduct = TBL::TBL_PRODUCTS;
        $tblMenu = TBL::TBL_MENUS;
        $tblBooking = TBL::TBL_BOOKINGS;
        $query = $this->model->newQuery()->select([
            "$tblBookedFood.booked_menu", "$tblBookedFood.service_code", "$tblBookedFood.booked_total",
            "$tblFood.food_id", "$tblFood.food_name",
            "$tblFood.food_name", "$tblFood.unit_price"
        ])
            ->join($tblMenu, "$tblBookedFood.menu_id", "=", "$tblMenu.menu_id")
            ->join($tblProduct, "$tblMenu.prd_id", "=", "$tblProduct.prd_id")
            ->join($tblFood, "$tblMenu.menu_id", "=", "$tblFood.menu_id")
            ->join($tblBooking, function($join) use  ($tblBooking, $tblProduct, $tblBookedFood){
                $join->on("$tblBooking.prd_id", '=', "$tblProduct.prd_id");
                $join->on("$tblBooking.booked_id", '=', "$tblBookedFood.booked_id");
                $join->on("$tblBooking.vendor_service_id", '=', "$tblProduct.vendor_service_id");
            })
            ->where("$tblBookedFood.booked_id", "=", $bookedId);
        return $query->get();
    }


}
