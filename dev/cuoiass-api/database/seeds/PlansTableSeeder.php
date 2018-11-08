<?php

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $customers = \App\Models\Customer::query()->get();
        foreach ($customers as $customer) {
            factory(Plan::class, 10)->create([
                'customer_id'=>$customer['customer_id'],
            ]);
        }

    }
}
