<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\CustomizeField::class, function (Faker $faker) {

    return [
        'customize_field_name' => $faker->text(20),
        'customize_field_type' => 'TEXTBOX',
        'customize_field_value' => $faker->word,
        'customize_field_key' => '',
        'prd_id' => '',
        'vendor_service_id' => '',
        'created_by' => 'admin@test.com'
    ];
});
