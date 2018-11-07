<?php

use App\Models\MasterService;
use Illuminate\Database\Seeder;

class MasterServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $serviceCodes = [
            "PHT" => 'Photo',
            "DRSS" => 'dress',
            "STD" => 'studio',
            "NC" => 'Nhẫn cưới',
            "QUAC" => 'Quà cưới',
            "TC" => 'Thiệp cưới',
            "TRTR" => 'Trang trí',
            "REST" => 'Nhà hàng',
            "HNM" => 'Honey moon(Travaler)',
            "XC" => 'Xe cưới',
            "VN" => 'Văn nghệ'
        ];

        foreach ($serviceCodes as $code => $name) {
            factory(MasterService::class)->create([
                'service_code' => $code,
                'service_name' => $name
            ]);
        }
    }
}
