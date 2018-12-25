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
            factory(\App\Models\Menu::class, 5)->create(
                [
                    'prd_id' => $pro['prd_id'],
                ]
            );
        }
    }
}
