<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\BookedOption::class, function (Faker $faker) {
    return [
        'option_name' => $faker->text(10),
        'option_quality' => $faker->randomNumber(1),
        'option_price' => $faker->randomFloat(10),
        'booked_id' => '3',
        'option_id' => '',
        'prd_id' => '',
        'vendor_service_id' => '',
        'created_by' => 'admin@test.com'
    ];
});
