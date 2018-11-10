<?php

use App\Models\VendorService;
use Faker\Generator as Faker;

$factory->define(VendorService::class, function (Faker $faker) {
    return [
        'vendor_id' => $faker->numerify('######'),
        'service_code' => $faker->postcode,
        'ven_serv_name' => $faker->title,
        'add_service' => $faker->title,
        'city' => $faker->city,
        'phone_service' => $faker->numerify('########'),
        'fax_service' => $faker->numerify('########'),
        'created_by' => 'admin@test.com'
    ];
});
