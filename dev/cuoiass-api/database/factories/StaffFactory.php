<?php

use App\Models\Staff;
use Faker\Generator as Faker;

$factory->define(Staff::class, function (Faker $faker) {


    return [
        'vendor_id' => $faker->numerify('######'),
        'role_id' =>$faker->numerify('#######'),
        'staff_name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->numerify('#######'),
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'address' => $faker->address,
        'created_by' => 'admin@test.com'
    ];
});
