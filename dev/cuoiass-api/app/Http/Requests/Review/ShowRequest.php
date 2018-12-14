<?php

namespace App\Http\Requests\Review;

use App\Http\Requests\RequestAbstract;
use Illuminate\Validation\Rule;

class ShowRequest extends RequestAbstract
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
            'review_response_vendor_id' => ['required','integer', 'exists:vendors,vendor_id'],
            'vendor_id' => ['required','integer', 'exists:vendors,vendor_id'],
            'review_id' => ['required','integer', 'exists:reviews,review_id'],
        ];
    }
}
