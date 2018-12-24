<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Option::class, function (Faker $faker) {
    return [
        'option_name' => $faker->text(10),
        'image_ids' => '3',
        'option_price' => $faker->randomFloat(10),
        'prd_id' => '',
        'vendor_service_id' => '',
        'created_by' => 'admin@test.com'
    ];
});
