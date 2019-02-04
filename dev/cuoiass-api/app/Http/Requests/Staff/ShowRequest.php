<?php

namespace App\Http\Requests\Staff;

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
            'vendor_id' => ['required','integer', 'exists:vendors,vendor_id'],
            'staff_id' => ['required','integer', 'exists:staffs,staff_id'],
        ];
    }
}
