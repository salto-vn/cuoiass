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
        $menus = \App\Models\Menu::query()->get();
        foreach ($bookings as $booking) {
            $vendor_service = \App\Models\VendorService::query()->find($booking['vendor_service_id']);
            dd($menus);
            $menu = $menus[rand(0,count($menus))];
            factory(\App\Models\BookedFood::class)->create(
                [
                    'booked_menu' => $menu['menu_name'],
                    'service_code' => $vendor_service['service_code'],
                    'booked_id' => $booking['booked_id'],
                    'menu_id' => $menu['menu_id'],
                ]
            );
        }
    }
}
