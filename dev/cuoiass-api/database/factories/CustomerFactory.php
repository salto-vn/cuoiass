<?php

use App\Models\Customer;
use Faker\Generator as Faker;

$factory->define(Customer::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'email' => $faker->unique()->email,
        'password' => $faker->password(10),
        'address' => $faker->address,
        'phone' => $faker->unique()->numerify('########'),
        'fb' => $faker->url,
        'member_flag' => 0,
        'created_by' => 'admin@test.com'
    ];
});
