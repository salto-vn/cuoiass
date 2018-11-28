<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Booking::class, function (Faker $faker) {

    $statues = ['IN-PROGESS','ACCEPTED','PAID','CANCELLED','DENIED','FINISHED'];


    return [
        'booked_cd' => "CASS-" . $faker->unique()->numerify('########'),
        'booked_pro_name' => '',
        'booked_size' => '',
        'booked_color' => '',
        'booked_material' => '',
        'booked_style' => '',
        'booked_album_page' => '',
        'booked_size_2' => '',
        'booked_color_2' => '',
        'booked_time' => '',
        'booked_date' => $faker->date('Y-m-d'),
        'try_date' => $faker->date('Y-m-d'),
        'activate_date' => $faker->date('Y-m-d'),
        'status' => array_rand($statues,1),
        'memo' => $faker->text(20),
        'payment_name' => $faker->name,
        'payment_phone' => $faker->phoneNumber,
        'payment_email' => $faker->email,
        'net_price' => $faker->randomFloat(10,200000,99999999),
        'gross_price' => $faker->randomFloat(10,200000,99999999),
        'invoice_url' => $faker->url,
        'plan_id' => '',
        'prd_id' => '',
        'vendor_service_id' => '',
        'created_by' => 'user@gmail.com',
    ];
});
