<?php

use App\Models\Account;
use Faker\Generator as Faker;

$factory->define(Account::class, function (Faker $faker) {
    return [
        'role_id' => 1,
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'staff_id' => 1,
        'vendor_id' => 1,
        'remember_token' => str_random(10),
        'created_user' => 'admin@gmail.com'
    ];
});
