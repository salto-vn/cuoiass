<?php

use Illuminate\Database\Seeder;

class CustomizeFieldsTableSeeder extends Seeder
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
        while ($i <= 20) {
            $i ++;
            factory(\App\Models\CustomizeField::class, 5)->create(
                [
                    'prd_id'=>$product[$i]['prd_id'],
                    'vendor_service_id'=>$product[$i]['vendor_service_id'],
                ]
            );
        }

    }
}
