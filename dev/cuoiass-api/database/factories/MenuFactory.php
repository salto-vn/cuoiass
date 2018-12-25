<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Menu::class, function (Faker $faker) {

    return [
        //
        'menu_name'=>$faker->text(20),
        'unit_price' => $faker->randomFloat(9),
        'prd_id' => '',
        'created_by' => 'user@gmail.com',
    ];
});
