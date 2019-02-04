<?php

use Illuminate\Database\Seeder;

class OptionsTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $product = \App\Models\Product::query()->get();
        $i = 0;
        foreach ($product as $product) {

            $i++;
            factory(\App\Models\Option::class, 3)->create(
                [
                    'prd_id' => $product['prd_id'],
                    'vendor_service_id' => $product['vendor_service_id'],
                ]
            );
        }
    }
}
