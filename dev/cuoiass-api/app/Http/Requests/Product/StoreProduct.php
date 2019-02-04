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
            'prd_name' => ['required','string', 'min:6','max:255'],
            'prd_desc' => ['required','string', 'min:10','max:255'],
            'price' => ['required','numeric'],
            'publish_flag' => ['required','in:1,0'],
            'prd_colors' =>  ['nullable','string'],
            'prd_sizes' => ['nullable','string'],
            'prd_materials' =>  ['nullable','string'],
            'prd_style' =>  ['nullable','string'],
            'prd_page' =>  ['nullable','integer'],
            'prd_party_photo_size' =>  ['nullable','integer'],
            'prd_times' =>  ['nullable'],
            'prd_times.*' => ['regex:([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?'],
            'vendor_service_id' => ['required','integer', 'exists:vendor_services,vendor_service_id'],
            'service_code' => ['required','integer', 'exists:vendor_services,vendor_service_id,vendor_id,service_code'],
            'images' => 'required',
            'images.*' => 'image|mimes:jpg,jpeg,png',
            'customize_fields' =>  ['nullable','array'],
            'customize_fields.*.vendor_service_id' => ['required_with:customize_fields','integer', 'exists:vendor_services,vendor_service_id'],
            'customize_fields.*.customize_field_name' => ['required_with:customize_fields.*.vendor_service_id','string','min:5','max:255'],
            'customize_fields.*.customize_field_type' => ['required_with:customize_fields.*.customize_field_name',Rule::in($customize_field_type)],
            'customize_fields.*.customize_field_key' => ['required_if:customize_fields.*.customize_field_type,RADIO,CHECKBOX,SELECT_MULTI,COMBOBOX','regex:(\d+)(,\s*\d+)*'], // format key,key1,key2
            'customize_fields.*.customize_field_value' => ['required_if:customize_fields.*.customize_field_name'], // if customize_field_key is RADIO,CHECKBOX,SELECT_MULTI,COMBOBOX format value,value1,value2

            'options' => ['nullable','array'],
            'options.*.option_name' => ['required_with:options','string'],
            'options.*.option_price' => ['required_with:options','numeric'],
            'options.*.images' => ['required_with:options.*.option_name','array'],
            'options.*.images.*' => 'image|mimes:jpg,jpeg,png',

            'menus' => 'nullable|array',
            'menus.foods' => ['required_with:menus','array'],
            'menus.foods.*.menu_id' => ['required_with:menus','integer'],
            'menus.foods.*.menu_name' => ['required_with:menus','string'],
            'menus.foods.*.unit_price' => ['required_with:menus','numeric'],
            'foods.*.images' => ['required_with:foods.*.food_name','array'],
            'foods.*.images.*' => 'image|mimes:jpg,jpeg,png',
        ];
    }
}
