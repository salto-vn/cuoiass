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
        $bookings = \App\Models\Booking::query()->get();
        $tblProduct = \App\Utils\TableName::TBL_PRODUCTS;
        $tblMenu = \App\Utils\TableName::TBL_MENUS;
        $menus = \App\Models\Menu::query()->select(["$tblMenu.menu_id", "$tblMenu.menu_name", "$tblProduct.service_code"])
            ->join("$tblProduct", "$tblMenu.prd_id", "=", "$tblProduct.prd_id")
            ->get();
        foreach ($bookings as $booking) {
            foreach ($menus as $menu) {
                if (in_array($menu['service_code'], [\App\Enums\ServiceCodeEnum::REST, \App\Enums\ServiceCodeEnum::QUAC])) {
                    factory(\App\Models\BookedFood::class)->create(
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
}
