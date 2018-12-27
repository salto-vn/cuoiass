<?php

use Illuminate\Database\Seeder;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $products = \App\Models\Product::query()->get();
        foreach ($products as $pro) {
            if (in_array($pro['service_code'], [\App\Enums\ServiceCodeEnum::REST, \App\Enums\ServiceCodeEnum::QUAC])) {
                factory(\App\Models\Menu::class, 1)->create(
                    [
                        'prd_id' => $pro['prd_id'],
                    ]
                );
            }
        }
    }
}
