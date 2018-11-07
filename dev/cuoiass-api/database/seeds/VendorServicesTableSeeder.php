<?php

use App\Models\Vendor;
use App\Models\VendorService;
use Illuminate\Database\Seeder;

class VendorServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $vendors = Vendor::query()->get();
        $services = \App\Models\MasterService::query()->get();

        foreach ($vendors as $item) {
            $serviceCode =  $services->random()['service_code'];
            factory(VendorService::class, 5)->create([
                'vendor_id' => $item->vendor_id,
                'service_code' => $serviceCode
            ]);
        }
    }
}
