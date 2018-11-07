<?php

use App\Models\Account;
use App\Models\Role;
use App\Models\Staff;
use Illuminate\Database\Seeder;

class AccountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $staffs = Staff::query()->get();
        $roles = Role::query()->get()->toArray();

        foreach ($staffs as $item) {
            factory(Account::class)->create([
                'role_id' => array_random($roles)['role_id'],
                'staff_id' => $item->staff_id,
                'vendor_id' => $item->vendor_id
            ]);
        }
    }
}
