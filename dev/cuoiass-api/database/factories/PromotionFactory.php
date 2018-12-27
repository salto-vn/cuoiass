<?php

use App\Models\Role;
use Faker\Generator as Faker;

$factory->define(Role::class, function (Faker $faker) {
    return [
        'role_name' => $faker->name(),
        'role_code' => $faker->postcode,
        'system_code' => $faker->unique()->numerify('#####'),
        'created_by' => 'admin@test.com'
    ];
});
