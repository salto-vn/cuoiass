<?php

use Illuminate\Database\Seeder;

class CustomizeFieldsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $inputType = ['COMBOBOX', 'TEXTBOX', 'RADIO', 'CHECKBOX', 'TEXTAREA'];
        $product = \App\Models\Product::query()->get();
        $i = 0;
        while ($i <= 20) {
            $i++;
            $type = array_random($inputType);
            if ($type == 'COMBOBOX'
                || $type == 'RADIO'
                || $type == 'CHECKBOX') {
                $customize_field_key = '1,2,3,4,5';
                $customize_field_value = 'A,B,C,D,E';
            } else {
                $customize_field_key = "";
                $customize_field_value = Faker\Provider\en_US\Text::asciify('*********');
            }
            factory(\App\Models\CustomizeField::class, 5)->create(
                [
                    'customize_field_type' => $type,
                    'customize_field_value' => $customize_field_value,
                    'customize_field_key' => $customize_field_key,
                    'prd_id' => $product[$i]['prd_id'],
                    'vendor_service_id' => $product[$i]['vendor_service_id'],
                ]
            );
        }

    }
}
