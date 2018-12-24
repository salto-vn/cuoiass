<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\CustomizeField::class, function (Faker $faker) {
    $inputType = ['combobox', 'textbox', 'radio', 'checkbox', 'textarea'];
    return [
        'customize_field_name' => $faker->text(20),
        'customize_field_type' => $faker->randomElement($inputType),
        'customize_field_value' => $faker->text(5),
        'prd_id' => '',
        'vendor_service_id' => '',
        'created_by' => 'admin@test.com'
    ];
});
