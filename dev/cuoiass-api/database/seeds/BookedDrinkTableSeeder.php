<?php

use Illuminate\Database\Seeder;

class BookedDrinkTableSeeder extends Seeder
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
        $tblDrink = \App\Utils\TableName::TBL_DRINKS;
        $drinks = \App\Models\Drink::query()->select(["$tblDrink.drink_id", "$tblMenu.prd_id", "$tblMenu.menu_id", "$tblMenu.menu_name", "$tblProduct.service_code"])
            ->join("$tblMenu", "$tblDrink.menu_id", "=", "$tblMenu.menu_id")
            ->join("$tblProduct", "$tblMenu.prd_id", "=", "$tblProduct.prd_id")
            ->where("$tblProduct.service_code", "=", \App\Enums\ServiceCodeEnum::REST)
            ->get();
        foreach ($drinks as $drink) {
            $bookings = \App\Models\Booking::query()->where("prd_id", "=", $drink["prd_id"])->get();
            foreach ($bookings as $booking) {
                factory(\App\Models\BookedDrink::class)->create(
                    [
                        'booked_menu' => $drink['menu_name'],
                        'service_code' => $drink['service_code'],
                        'booked_id' => $booking['booked_id'],
                        'menu_id' => $drink['menu_id'],
                        'drink_id' => $drink['drink_id'],
                    ]
                );
            }
        }
    }
}
