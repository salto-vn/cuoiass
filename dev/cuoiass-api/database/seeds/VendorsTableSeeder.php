<?php

use Illuminate\Database\Seeder;

class VendorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(\App\Models\Vendor::class)->create([
            'vendor_name' => 'Studio A'
        ]);

        factory(\App\Models\Vendor::class)->create([
            'vendor_name' => 'Nhà hàng '
        ]);

        factory(\App\Models\Vendor::class)->create([
            'vendor_name' => 'Trang trí B '
        ]);
    }
}
