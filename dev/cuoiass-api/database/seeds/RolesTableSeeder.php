<?php

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Role::class)->create([
            'role_name' => 'Administrator',
            'role_code' => 'ADM',
            'system_code' => 'ADMIN'
        ]);

        factory(Role::class)->create([
            'role_name' => 'Vendor',
            'role_code' => 'VDN_MNG',
            'system_code' => 'BACKYARD'
        ]);

        factory(Role::class)->create([
            'role_name' => 'Customer ',
            'role_code' => 'CSM',
            'system_code' => 'FRONT'
        ]);
    }
}
