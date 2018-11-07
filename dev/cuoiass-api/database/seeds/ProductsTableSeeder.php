<?php

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $venderServices = \App\Models\VendorService::query()->get();

        foreach ($venderServices as $service) {
            factory(Product::class, 10)->create([
                'vendor_service_id'=>$service['vendor_service_id'],
                'service_code' => $service['service_code']
            ]);
        }

    }
}
