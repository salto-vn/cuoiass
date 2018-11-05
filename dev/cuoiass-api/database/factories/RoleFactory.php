<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Role::class, function (Faker $faker) {
    $faker->addProvider(new \Faker\Provider\Payment($faker));
    return [
        'role_name' => $faker->name(),
        'role_code' => $faker->swiftBicNumber(),
        'system_code' => $faker->creditCardNumber(),
        'created_user' => 'admin@test.com'
    ];
});
