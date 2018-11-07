<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call(RolesTableSeeder::class);
        $this->call(MasterServicesTableSeeder::class);
        $this->call(VendorsTableSeeder::class);
        $this->call(VendorServicesTableSeeder::class);
        $this->call(StaffsTableSeeder::class);
        $this->call(AccountsTableSeeder::class);
    }
}
