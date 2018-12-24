<?php

use Illuminate\Database\Seeder;

class BookedCustomizeFieldsTableSeeder extends Seeder
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
            $customFields = \App\Models\CustomizeField::query()
                ->where('prd_id', '=', $booking['prd_id'])
                ->where('vendor_service_id', '=', $booking['vendor_service_id'])->get();
            foreach ($customFields as $field) {
                factory(\App\Models\BookedCustomizeField::class)->create(
                    [
                        'booked_id' => $booking['booked_id'],
                        'customize_field_id' => $field['customize_field_id'],
                        'pro_id' => $booking['prd_id'],
                    ]
                );
            }
        }
    }
}
