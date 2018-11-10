<?php

use App\Models\Vendor;
use Faker\Generator as Faker;

$factory->define(Vendor::class, function (Faker $faker) {
    return [
        'vendor_name' => $faker->name(),
        'company' => $faker->company,
        'address' => $faker->address,
        'city' => $faker->city,
        'web_url' => $faker->url,
        'president_name' => $faker->name,
        'phone' => $faker->numerify('#######'),
        'credit_balance' => $faker->unique()->numerify('#####'),
        'fax' => $faker->numerify('########'),
        'created_by' => 'admin@test.com'
    ];
});
