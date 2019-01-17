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
        $tblProduct = TBL::TBL_PRODUCTS;
        $tblMenu = TBL::TBL_MENUS;
        $tblBooking = TBL::TBL_BOOKINGS;
        $query = $this->model->newQuery()->select([
            "$tblBookedDrink.booked_menu", "$tblBookedDrink.service_code", "$tblBookedDrink.booked_total",
            "$tblDrink.drink_id", "$tblDrink.drink_name", "$tblDrink.unit_price"
            , "$tblDrink.image_ids"
        ])
            ->join($tblMenu, "$tblBookedDrink.menu_id", "=", "$tblMenu.menu_id")
            ->join($tblProduct, "$tblMenu.prd_id", "=", "$tblProduct.prd_id")
            ->join($tblDrink, "$tblMenu.menu_id", "=", "$tblDrink.menu_id")
            ->join($tblBooking, function($join) use  ($tblBooking, $tblProduct, $tblBookedDrink){
                $join->on("$tblBooking.prd_id", '=', "$tblProduct.prd_id");
                $join->on("$tblBooking.booked_id", '=', "$tblBookedDrink.booked_id");
                $join->on("$tblBooking.vendor_service_id", '=', "$tblProduct.vendor_service_id");
            })
            ->where("$tblBookedDrink.booked_id", "=", $bookedId);
        return $query->get();
    }


}
