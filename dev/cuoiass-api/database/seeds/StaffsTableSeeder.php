<?php

use App\Models\Role;
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
        $roles = Role::query()->get();


        foreach ($vendors as $item) {
            $role = $roles->random();
            factory(Staff::class)->create([
                'vendor_id' => $item->vendor_id,
                'role_id' => $role->role_id
            ]);
        }
    }
}
