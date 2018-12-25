<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Drink::class, function (Faker $faker) {
    return [
        'drink_name' => $faker->text(10),
        'image_ids' => '1,2,3',
        'unit_price' => $faker->randomFloat(9), // price of food
        'menu_id' => '',
        'created_by' => 'admin@test.com'
    ];
});
