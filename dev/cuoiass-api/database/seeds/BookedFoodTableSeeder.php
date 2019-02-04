<?php

use Illuminate\Database\Seeder;

class BookedFoodTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        //
        $tblProduct = \App\Utils\TableName::TBL_PRODUCTS;
        $tblMenu = \App\Utils\TableName::TBL_MENUS;
        $tblFood = \App\Utils\TableName::TBL_FOODS;
        $foods = \App\Models\Food::query()->select(["$tblFood.food_id","$tblMenu.prd_id", "$tblMenu.menu_id", "$tblMenu.menu_name", "$tblProduct.service_code"])
            ->join("$tblMenu", "$tblFood.menu_id", "=", "$tblMenu.menu_id")
            ->join("$tblProduct", "$tblMenu.prd_id", "=", "$tblProduct.prd_id")
            ->whereIn("$tblProduct.service_code", [\App\Enums\ServiceCodeEnum::REST, \App\Enums\ServiceCodeEnum::QUAC])
            ->get();

        foreach ($foods as $food) {
            $bookings = \App\Models\Booking::query()->where("prd_id", "=", $food["prd_id"])->get();
            foreach ($bookings as $booking) {
                factory(\App\Models\BookedFood::class)->create(
                    [
                        'booked_menu' => $food['menu_name'],
                        'service_code' => $food['service_code'],
                        'booked_id' => $booking['booked_id'],
                        'menu_id' => $food['menu_id'],
                        'food_id' => $food['food_id'],
                    ]
                );
            }
        }
    }
}
