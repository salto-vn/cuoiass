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
            'role_name' => 'Administator'
        ]);

        factory(Role::class)->create([
            'role_name' => 'Customer'
        ]);

        factory(Role::class)->create([
            'role_name' => 'Staff'
        ]);
    }
}
