<?php

namespace App\Http\Requests\Booking;

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
            'orderBy' => Rule::in([
                    'booked_cd', 'booked_pro_name', 'booked_date'
                    ,'try_date', 'activate_date','status'
                    , 'customer_name']
            ),
            'order' => Rule::in(['asc', 'desc']),
        ];
    }
}
