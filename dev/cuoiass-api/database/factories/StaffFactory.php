<?php

use App\Models\Staff;
use Faker\Generator as Faker;

$factory->define(Staff::class, function (Faker $faker) {
    return [
        'vendor_id' => $faker->numerify('######'),
        'staff_name' => $faker->name,
        'phone' => $faker->numerify('#######'),
        'address' => $faker->address,
        'created_by' => 'admin@test.com'
    ];
});
