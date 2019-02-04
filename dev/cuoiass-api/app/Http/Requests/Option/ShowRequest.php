<?php

namespace App\Http\Requests\Option;

use App\Http\Requests\RequestAbstract;
use App\Utils\TableName;

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
        $tblVendor = TableName::TBL_VENDORS;
        $tblProduct = TableName::TBL_PRODUCTS;
        return [
            'vendor_id' => ['required','integer', "exists:$tblVendor,vendor_id"],
            'prd_id' => ['required','integer', "exists:$tblProduct,prd_id"],
        ];
    }
}
