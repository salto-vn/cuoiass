<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\BookedCustomizeField::class, function (Faker $faker) {
    return [
        'booked_id' => '',
        'customize_field_answer' => $faker->word,
        'customize_field_id' => '',
        'pro_id' => '',
        'created_by' => 'admin@test.com'
    ];
});
