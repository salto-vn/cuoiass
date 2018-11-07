<?php

use App\Models\Account;
use Faker\Generator as Faker;

$factory->define(Account::class, function (Faker $faker) {
    return [
        'role_id' => 1,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'staff_id' => $faker->numerify('######'),
        'vendor_id' => $faker->numerify('######'),
        'created_by' => 'admin@gmail.com'
    ];
});
