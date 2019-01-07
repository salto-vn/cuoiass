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
            'booked_color_2' => ['nullable', 'string',"max:25"],
            'booked_time' => ['nullable', 'date_format:H:i:s'],
            'try_date' => ['required', 'date'],
            'activate_date' => ['required', 'date'],
            'booked_date' => ['required', 'date'],
            'status' => ['required', 'string',"max:20"],
            'memo' => ['string',"max:255"],
            'payment_method' => ['string',"max:255"],
            'payment_name' => ['string',"max:255"],
            'payment_phone' => ['string',"max:255"],
            'payment_email' => ['email',"max:255"],
            'net_price' => ['required','numeric'],
            'gross_price' => ['required','numeric'],
            'invoice_url' => ['url','string',"max:255"],
            'promotion_code' => ['string',"max:200"],
        ];


        return $rule;
    }

}
