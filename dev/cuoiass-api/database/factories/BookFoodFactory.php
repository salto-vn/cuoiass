<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Food::class, function (Faker $faker) {
    return [
        'food_name' => $faker->text(10),
        'image_ids' => '1,2,3',
        'menu_id' => '',
        'created_by' => 'admin@test.com'
    ];
});
