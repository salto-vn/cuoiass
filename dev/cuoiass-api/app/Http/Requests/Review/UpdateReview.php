<?php

namespace App\Http\Requests\Review;

use App\Http\Requests\RequestAbstract;

class UpdateReview extends RequestAbstract
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
            'review_id' => ['required', 'exists:reviews,review_id'],
            'review_response_vendor_id' => ['required','integer', 'exists:vendors,vendor_id'],
            'vendor_id' => ['required','integer', 'exists:vendors,vendor_id'],
            'review_response_content' => 'required|string|max:255|min:10',
        ];
    }
}
