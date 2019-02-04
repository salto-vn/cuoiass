<?php

namespace App\Http\Requests\Review;

use App\Http\Requests\RequestAbstract;
use Illuminate\Validation\Rule;

class GetRequest extends RequestAbstract
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
            'vendor_id' => ['required','integer', 'exists:vendors,vendor_id'],
            'limit' => 'integer',
            'orderBy' => Rule::in(['review_id', 'review_content', 'review_date'
                    , 'bookings.booked_cd', 'bookings.booked_pro_name',
                    'products.prd_cd', 'customers.first_name', 'customers.last_name']
            ),
            'order' => Rule::in(['asc', 'desc']),
        ];
    }
}
