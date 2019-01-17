<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\BookedDrink::class, function (Faker $faker) {
    return [
        'booked_menu' => '', //menu name
        'service_code' => 'REST',
        'booked_total' => $faker->randomNumber(1), //quantity
        'booked_id' => '',
        'menu_id' => '',
        'created_by' => 'admin@test.com'
    ];
});
