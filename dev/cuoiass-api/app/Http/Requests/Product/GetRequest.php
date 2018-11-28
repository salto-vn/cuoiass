<?php

namespace App\Http\Requests\Product;

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
            'sortbyc' => Rule::in(['prd_id', 'prd_cd', 'price', 'publish_flag', 'prd_party_photo_size']),
            'sortby' => Rule::in(['asc', 'desc']),
        ];
    }
}
