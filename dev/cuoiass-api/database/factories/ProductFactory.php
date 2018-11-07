<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Product::class, function (Faker $faker) {
    return [
        'prd_id' => $faker->numerify('#####'),
        'prd_cd' => "PRD-" . $faker->unique()->numerify('#####'),
        'prd_name' => $faker->text(50),
        'prd_desc' => $faker->text(200),
        'price' => $faker->randomFloat(20, 100000, 99999999999),
        'publish_flag' => '1',
        'publish_date' => $faker->date('Y-m-d'),
        'prd_colors' => 'RED,BLUE,GREEN',
        'prd_sizes' => '20,30,40',
        'prd_materials' => 'Leather,A,B',
        'prd_style' => 'F,E',
        'prd_page' => $faker->randomNumber(2),
        'prd_party_photo_size' => $faker->numberBetween(20, 1000) . 'x' . $faker->numberBetween(20, 1000),
        'prd_times' => '20:00,10:00',
        'prd_images' => '1,2',
        'vendor_service_id' => '1',
        'service_code' => 'PHT',
        'created_by' => 'admin@test.com'
    ];
});
