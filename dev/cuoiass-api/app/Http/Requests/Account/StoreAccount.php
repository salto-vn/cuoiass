<?php

namespace App\Http\Requests\Account;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccount extends FormRequest
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
            'email' => 'required|min:6|max:255|email|unique:accounts',
            'name' => 'required|min:6|max:255|regex:/^[\pL\s\-]+$/u',
            'password' => 'required|min:6|max:255',
            'role_id' => 'required|exists:roles',
            'staff_id' => 'required|integer',
            'vendor_id' => 'required|integer'
        ];
    }
}
