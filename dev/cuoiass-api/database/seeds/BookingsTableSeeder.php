<?php

use App\Models\Booking;
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
        $promotions = \App\Models\Promotion::query()->get();
        foreach ($products as $product) {
            $colors = explode(',', $product['prd_colors']);
            $materials = explode(',', $product['prd_materials']);
            $sizes = explode(',', $product['prd_sizes']);
            $times = explode(',', $product['prd_times']);
            $index = rand(0, count($plans) - 1);
            $indexPro = rand(0, count($promotions) - 1);
            $plan = $plans[$index];
            $promotion = $promotions[$indexPro];
            factory(\App\Models\Booking::class, 1)->create([
                'booked_pro_name' => $product['prd_name'],
                'booked_size' => $sizes[array_rand($sizes)],
                'booked_color' => $colors[array_rand($colors)],
                'booked_material' => $materials[array_rand($materials)],
                'promotion_code' => $promotion['promotion_code'],
                'booked_style' => $product['prd_style'],
                'booked_album_page' => $product['prd_page'],
                'booked_photo_size' => $product['prd_party_photo_size'],
                'booked_size_2' => $sizes[array_rand($sizes)],
                'booked_color_2' => $colors[array_rand($colors)],
                'booked_time' => Carbon\Carbon::createFromFormat("H:i:s", $times[array_rand($times)] . ':00'),
                'plan_id' => $plan['plan_id'],
                'prd_id' => $product['prd_id'],
                'vendor_service_id' => $product['vendor_service_id'],
            ]);
        }

    }
}
