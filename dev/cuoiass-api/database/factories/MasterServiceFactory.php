<?php

use App\Models\MasterService;
use Faker\Generator as Faker;

$factory->define(MasterService::class, function (Faker $faker) {
    return [
        'service_code' => $faker->postcode,
        'service_name' => $faker->title,
        'created_by' => 'admin@test.com'
    ];
});
