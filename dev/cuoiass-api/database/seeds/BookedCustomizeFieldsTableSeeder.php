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
                switch (strtoupper($field['customize_field_type'])) {
                    case "COMBOBOX":
                        $values = explode(",",trim($field['customize_field_key']));
                        $customize_field_answer = array_random($values);
                        break;
                    case "RADIO":
                        $values = explode(",",trim($field['customize_field_key']));
                        $customize_field_answer = array_random($values);
                        break;
                    case "CHECKBOX":
                        $values = explode(",",trim($field['customize_field_key']));
                        $customize_field_answer = array_random($values);
                        break;
                    default:
                        $customize_field_answer = $field['customize_field_value'];
                        break;
                }

                factory(\App\Models\BookedCustomizeField::class)->create(
                    [
                        'booked_id' => $booking['booked_id'],
                        'customize_field_id' => $field['customize_field_id'],
                        'customize_field_answer' => $customize_field_answer,
                        'pro_id' => $booking['prd_id'],
                    ]
                );
            }
        }
    }
}
