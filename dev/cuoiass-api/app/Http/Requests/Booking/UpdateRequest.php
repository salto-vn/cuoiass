<?php

namespace App\Http\Requests\Booking;

use App\Http\Requests\RequestAbstract;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\Plan;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\VendorService;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

use App\Utils\TableName as TBL;

class UpdateRequest extends RequestAbstract
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
        $rule = [
            'vendor_id' => ['required', 'integer', 'exists:vendors,vendor_id'],
            'booked_cd' => ['required', 'exists:bookings,booked_cd'],
            'booked_pro_name' => ['required', 'string','max:255'],
            'booked_size' => ['nullable', 'integer','digits_between:0,11'],
            'booked_color' => ['nullable', 'string',"max:25"],
            'booked_material' => ['nullable', 'string',"max:255"],
            'booked_style' => ['nullable', 'string',"max:255"],
            'booked_album_page' => ['nullable', 'integer',"digits_between:0,11"],
            'booked_photo_size' => ['nullable', 'string',"max:255"],
            'booked_size_2' => ['nullable', 'integer',"digits_between:0,11"],
            'booked_color_2' => ['nullable', 'string',"max:255"],
            'booked_time' => ['nullable', 'date_format:H:i:s'],
            'try_date' => ['required', 'date_format:Y-m-d H:i:s'],
            'activate_date' => ['required', 'date_format:Y-m-d H:i:s'],
            'booked_date' => ['required', 'date'],
            'status' => ['required', 'string', Rule::in(\Constant::BOOKING_STATUS)],
            'memo' => ['string',"max:255"],
            'payment_method' => ['integer',"in:0,1,2,3"],
            'payment_name' => ['string',"max:255"],
            'payment_phone' => ['string',"max:255"],
            'payment_email' => ['email',"max:255"],
            'net_price' => ['required','numeric'],
            'gross_price' => ['required','numeric'],
            'invoice_url' => ['url','string',"max:255"],
            'promotion_code' => ['string',"max:200"],
            'customer' => ['required'],
            'customer.customer_id' => ['required_with:customer','integer'],
            'customer.first_name' => ['required_with:customer','string'],
            'customer.last_name' => ['required_with:customer','string'],
            'customer.phone' => ['required_with:customer','string'],
            'plan' => ['required'],
            'plan.plan_id' => ['required_with:plan'],
            'plan.org_date' => ['required_with:plan','date_format:Y-m-d H:i:s'],
            'plan.gr_name' => ['required_with:plan','string'],
            'plan.br_name' => ['required_with:plan','string'],
            'foods' => ['nullable','array'],
            'foods.*.booked_food_id' => ['required_with:foods'],
            'foods.*.booked_menu' => ['required_with:foods','string'],
            'foods.*.service_code' => ['required_with:foods','string'],
            'foods.*.booked_total' => ['required_with:foods','integer'],
            'foods.*.unit_price' => ['required_with:foods','numeric'],
            'drinks' => ['nullable','array'],
            'drinks.*.booked_drink_id' => ['required_with:drinks'],
            'drinks.*.booked_menu' => ['required_with:drinks','string'],
            'drinks.*.service_code' => ['required_with:drinks','string'],
            'drinks.*.booked_total' => ['required_with:drinks','integer'],
            'drinks.*.unit_price' => ['required_with:drinks','numeric'],

            'customize_fields' => ['nullable','array'],
            'customize_fields.*.booked_cus_field_id' => ['required_with:customize_fields'],
            'customize_fields.*.customize_field_answer' => ['required_with:customize_fields','string'],
            'options' => ['nullable','array'],
            'options.news' => ['nullable','array'],
            'options.news.*.option_quality' => ['required_with:options.news','integer'],
            'options.news.*.option_id' => ['required_with:options.news','exists:options,option_id'],
            'options.news.*.prd_id' => ['required_with:options.news','exists:products,prd_id'],
            'options.news.*.booked_id' => ['required_with:options.news','exists:bookings,booked_id'],
            'options.news.*.vendor_service_id' => ['required_with:options.news','exists:vendor_services,vendor_service_id'],
            'options.updates' => ['nullable','array'],
            'options.updates.*.booked_opt_id' => ['required_with:options.updates','exists:booked_options,booked_opt_id'],
            'options.updates.*.option_quality' => ['required_with:options.updates','integer'],
            'options.deletes' => ['nullable','array'],
            'options.deletes.*' => ['required_with:options.deletes','exists:booked_options,booked_opt_id'],
        ];


        return $rule;
    }

}
