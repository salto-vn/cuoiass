<?php

namespace App\Http\Requests\Product;

use App\Utils\TableName;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProduct extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $customize_field_type=['TEXTBOX','TEXTAREA','FILE','RADIO','CHECKBOX','SELECT_MULTI','COMBOBOX'];
        return [
            'prd_cd' => ['required','string', 'unique:products,prd_cd'],
            'prd_name' => ['required','string', 'min:6','max:255'],
            'prd_desc' => ['required','string', 'min:10','max:255'],
            'price' => ['required','numeric'],
            'publish_flag' => ['nullable','in:1,0'],
            'prd_colors' =>  ['nullable','string'],
            'prd_sizes' => ['nullable','string'],
            'prd_materials' =>  ['nullable','string'],
            'prd_style' =>  ['nullable','string'],
            'prd_page' =>  ['nullable','integer'],
            'prd_party_photo_size' =>  ['nullable','integer'],
            'prd_times' =>  ['nullable'],
            'prd_times.*' => ['regex:([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?'],
            'vendor_service_id' => ['required','integer', 'exists:vendor_services,vendor_service_id'],
            'service_code' => ['required','string', 'exists:vendor_services,service_code'],
            'images' => 'required',
            'images.*' => 'required_with:images|active_url',
            'customize_fields' =>  ['nullable','array'],
            'customize_fields.*.vendor_service_id' => ['required_with:customize_fields','integer', 'exists:vendor_services,vendor_service_id'],
            'customize_fields.*.customize_field_name' => ['required_with:customize_fields.*.vendor_service_id','string','min:5','max:255'],
            'customize_fields.*.customize_field_type' => ['required_with:customize_fields.*.customize_field_name',Rule::in($customize_field_type)],
            'customize_fields.*.customize_field_key' => ['required_if:customize_fields.*.customize_field_type,RADIO,CHECKBOX,SELECT_MULTI,COMBOBOX','regex:/[a-zA-Z0-9][,][a-zA-Z0-9]+/'], // format key,key1,key2
            'customize_fields.*.customize_field_value' => ['required_with:customize_fields.*.customize_field_key'], // if customize_field_key is RADIO,CHECKBOX,SELECT_MULTI,COMBOBOX format value,value1,value2

            'options' => ['nullable','array'],
            'options.*.option_name' => ['required_with:options','string'],
            'options.*.option_price' => ['required_with:options','numeric'],
            'options.*.images' => ['required_with:options.*.option_name','array'],
            'options.*.images.*' => 'required_with:options.*.images|active_url',

            // schedule_photos required if service_code is PHT
            'schedule_photos' => ['required_if:service_code,PHT','array'],
            'schedule_photos.*.sche_start_time' => ['required_with:schedule_photos','date_format:Y-m-d H:i:s'],
            'schedule_photos.*.sche_end_time' => ['required_with:schedule_photos','date_format:Y-m-d H:i:s'],
            'schedule_photos.*.sche_title' => ['required_with:schedule_photos','string','max:255'],
            'schedule_photos.*.sche_desc' => ['required_with:schedule_photos','string','max:255'],
            'schedule_photos.*.images' => ['required_with:menus.*.drinks','array'],
            'schedule_photos.*.images.*' => ['required_with:schedule_photos.*.images','active_url'],


            // 1 Product(Restaurant, Qua Cuoi) -> N Menu(Foods, Drinks)
            'menu_foods' => 'nullable|array',
            'menu_foods.*.menu_name' => ['required_with:menu_foods','string','max:255'],
            'menu_foods.*.unit_price' => ['required_with:menu_foods','numeric'],

            // 1 Menu -> N Foods
            'menu_foods.*.foods' => ['nullable','array'],
            'menu_foods.*.foods.*.food_name' => ['required_with:menu_foods.*.foods','string','max:255'],
            'menu_foods.*.foods.*.unit_price' => ['required_with:menu_foods.*.foods','numeric'],
            'menu_foods.*.foods.*.images' => ['required_with:menu_foods.*.foods','array'],
            'menu_foods.*.foods.*.images.*' => 'active_url',

            // 1 Menu -> N Drinks
            'menu_drinks' => 'nullable|array',
            'menu_drinks.*.menu_name' => ['required_with:menu_drinks','string','max:255'],
            'menu_drinks.*.unit_price' => ['required_with:menu_drinks','numeric'],
            'menu_drinks.*.drinks' => ['nullable','array'],
            'menu_drinks.*.drinks.*.drink_name' => ['required_with:menu_drinks.*.drinks','string','max:255'],
            'menu_drinks.*.drinks.*.unit_price' => ['required_with:menu_drinks.*.drinks','numeric'],
            'menu_drinks.*.drinks.*.images' => ['required_with:menu_drinks.*.drinks','array'],
            'menu_drinks.*.drinks.*.images.*' => ['required_with:menu_drinks.*.drinks.*.images','active_url'],
        ];
    }
}
