<?php

use App\Models\Customer;
use Faker\Generator as Faker;

$factory->define(Customer::class, function (Faker $faker) {
    $inputType = ['COMBO_BOX', 'TEXT_BOX', 'RADIO', 'SELECT_MULTI', 'CHECKBOX', 'TEXT_AREA'];
    return [
        'customize_field_name' => $faker->text,
        'customize_field_type' => $faker->randomElement($inputType),
        'customize_field_value' => $faker->text,
        'prd_id' => '',
        'vendor_service_id' => '',
        'created_by' => 'admin@test.com'
    ];
});
