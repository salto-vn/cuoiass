<?php

namespace App\Http\Requests\Review;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetRequest extends FormRequest
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
        return [
            'limit' => 'integer',
//            'search' => '',
            'sortbyc' => Rule::in(['review_id', 'review_content', 'review_date'
                , 'booked_cd', 'booked_pro_name', 'prd_cd', 'first_name', 'last_name']),
            'sortby' => Rule::in(['asc', 'desc']),
//            'reviews.review_id',
//            'reviews.review_content',
//            'reviews.review_date',
//            'reviews.review_rate',
//            'reviews.review_imgs',
//            'bookings.booked_cd',
//            'bookings.booked_pro_name',
//            'products.prd_cd',
//            'customers.first_name',
//            'customers.last_name'
//            'email' => 'required|min:6|max:255|email|unique:accounts',
//            'name' => 'required|min:6|max:255|regex:/^[\pL\s\-]+$/u',
//            'password' => 'required|min:6|max:255',
//            'role_id' => 'required|exists:roles',
//            'staff_id' => 'required|integer',
//            'vendor_id' => 'required|integer'
        ];
    }
}
