<?php

use App\Models\Customer;
use Illuminate\Database\Seeder;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bookings = \App\Models\Booking::query()->get();
        foreach ($bookings as $booking) {
            $plan = \App\Models\Plan::find($booking['plan_id']);
            factory(\App\Models\Review::class, 10)->create([
                'prd_id' => $booking['prd_id'],
                'booked_id' => $booking['booked_id'],
                'customer_id' => $plan['customer_id'],
            ]);
        }
    }
}
