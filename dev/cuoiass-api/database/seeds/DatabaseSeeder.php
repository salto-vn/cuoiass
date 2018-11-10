<?php

use App\Models\Product;
use App\Models\Role;
use App\Models\Vendor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');

        \App\Models\MasterService::truncate();
        Vendor::truncate();
        Role::truncate();
        Product::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');


        $this->call(RolesTableSeeder::class);
        $this->call(MasterServicesTableSeeder::class);
        $this->call(VendorsTableSeeder::class);
        $this->call(VendorServicesTableSeeder::class);
        $this->call(StaffsTableSeeder::class);
        $this->call(ProductsTableSeeder::class);
        $this->call(CustomersTableSeeder::class);
        $this->call(PlansTableSeeder::class);
        $this->call(BookingsTableSeeder::class);
        $this->call(ReviewsTableSeeder::class);
    }
}
