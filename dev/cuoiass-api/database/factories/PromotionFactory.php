<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Promotion::class, function (Faker $faker) {
    $type = ['Direct', 'Coupon']; //Direct : giam so tien truc tiep, Coupon giam theo %
    $promotion_type = $faker->randomElement($type);
    if ($promotion_type == 'Direct') {
        $promotion_amount = $faker->randomFloat(6);
    } else {
        $promotion_amount = $faker->numberBetween(0,100);
    }
    return [
        'promotion_title' => $faker->text(50),
        'promotion_code' => $faker->bankAccountNumber,
        'start_date' => $faker->date(),
        'end_date' => '2019-12-01',
        'promotion_type' => $promotion_type,
        'promotion_amount' => $promotion_amount,
        'created_by' => 'admin@test.com'
    ];
});
