<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Plan::class, function (Faker $faker) {

    return [
        //
        'plan_id'=>'PLAN-'.$faker->numerify('######'),
        'plan_date' => $faker->date('Y-m-d'),
        'org_date' => $faker->date('Y-m-d'),
        'gr_name' => $faker->firstName,
        'br_name' => $faker->lastName,
        'org_address' => $faker->address,
        'phone' => $faker->numerify('##########'),
        'total_price' => $faker->randomFloat(9,200000,999999999),
        'customer_id' => '',
        'created_by' => 'user@gmail.com',
    ];
});
