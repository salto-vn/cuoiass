<?php

use App\Models\Staff;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class StaffsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $vendors = Vendor::query()->get();

        foreach ($vendors as $item) {
            factory(Staff::class)->create([
                'vendor_id' => $item->vendor_id
            ]);
        }
    }
}
