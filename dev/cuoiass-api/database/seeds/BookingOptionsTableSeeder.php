<?php

use Illuminate\Database\Seeder;

class BookingOptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $bookings = \App\Models\Booking::query()->get();
        foreach ($bookings as $booking) {
            $options = \App\Models\Option::query()
                ->where('prd_id', '=', $booking['prd_id'])
                ->where('vendor_service_id', '=', $booking['vendor_service_id'])->get();
            foreach ($options as $field) {
                factory(\App\Models\BookedOption::class)->create(
                    [
                        'booked_id' => $booking['booked_id'],
                        'option_id' => $field['option_id'],
                        'prd_id' => $booking['prd_id'],
                        'vendor_service_id' => $booking['vendor_service_id'],
                    ]
                );
            }


        }
    }
}
