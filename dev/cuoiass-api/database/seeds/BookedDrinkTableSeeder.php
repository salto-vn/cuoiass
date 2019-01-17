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
        $menus = \App\Models\Menu::query()->select(["$tblMenu.prd_id", "$tblMenu.menu_id", "$tblMenu.menu_name", "$tblProduct.service_code"])
            ->join("$tblProduct", "$tblMenu.prd_id", "=", "$tblProduct.prd_id")
            ->where("$tblProduct.service_code", "=", \App\Enums\ServiceCodeEnum::REST)
            ->get();
        foreach ($menus as $menu) {
            $bookings = \App\Models\Booking::query()->where("prd_id", "=", $menu["prd_id"])->get();
            foreach ($bookings as $booking) {
                factory(\App\Models\BookedDrink::class)->create(
                    [
                        'booked_menu' => $menu['menu_name'],
                        'service_code' => $menu['service_code'],
                        'booked_id' => $booking['booked_id'],
                        'menu_id' => $menu['menu_id'],
                    ]
                );
            }
        }
    }
}
