<?php

use App\Models\Product;
use Illuminate\Database\Seeder;

class BookingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plans = \App\Models\Plan::query()->get();
        $products = \App\Models\Product::query()->get();

        foreach ($products as $product) {
            $colors = explode(',',$product['prd_colors']);
            $materials = explode(',',$product['prd_materials']);
            $sizes = explode(',',$product['prd_sizes']);
            $times = explode(',',$product['prd_times']);
            foreach ($plans as $plan) {
                factory(\App\Models\Booking::class, 1)->create([
                    'booked_pro_name' => $product['prd_name'],
                    'booked_size' => array_rand($sizes,1),
                    'booked_color' => array_rand($colors,1),
                    'booked_material' => array_rand($materials,1),
                    'booked_style' => $product['booked_style'],
                    'booked_album_page' => $product['booked_album_page'],
                    'booked_size_2' => array_rand($sizes,1),
                    'booked_color_2' => array_rand($colors,1),
                    'booked_time' =>  array_rand($times,1),
                    'plan_id' => $plan['plan_id'],
                    'prd_id' => $product['prd_id'],
                    'vendor_service_id' => $product['vendor_service_id'],
            ]);
            }

        }

    }
}
