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
                    , 'bookings.booked_cd', 'bookings.booked_pro_name',
                    'products.prd_cd', 'customers.first_name', 'customers.last_name']
            ),
            'sortby' => Rule::in(['asc', 'desc']),
        ];
    }
}
