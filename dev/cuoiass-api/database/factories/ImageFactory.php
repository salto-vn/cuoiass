<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Image::class, function (Faker $faker) {


    return [
        'img_url' =>$faker->imageUrl(640,480),
        'created_by' => 'admin@test.com'
    ];
});
