<?php

namespace App\Http\Requests\staff;

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
            'page' => 'required|integer',
            'limit' => 'integer|min:1',
            //'sortbyc' => Rule::in(['review_id', 'review_content', 'review_date'
            //    , 'booked_cd', 'booked_pro_name', 'prd_cd', 'first_name', 'last_name']),
            //'sortby' => Rule::in(['asc', 'desc']),
        ];
    }
}
