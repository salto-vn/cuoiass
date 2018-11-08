<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Review::class, function (Faker $faker) {
    return [
        //
        'review_content' => $faker->text(255),
        'review_date' => $faker->date('Y-m-d'),
        'review_rate' => $faker->numberBetween(0,5),
        'review_imgs' => '1,2',
        'prd_id' => '1',
        'booked_id' => '2',
        'customer_id' => '3',
        'created_by' => 'admin@test.com'
    ];
});
