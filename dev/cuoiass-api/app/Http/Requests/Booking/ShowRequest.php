<?php

namespace App\Http\Requests\Booking;

use App\Http\Requests\RequestAbstract;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\Plan;
use App\Models\Product;
use App\Models\VendorService;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

use App\Utils\TableName as TBL;

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
        $booking = new Booking();
        $customer = new Customer();
        $product = new Product();
        $vendorService = new VendorService();
        $plan = new Plan();
        $tblBooking = TBL::TBL_BOOKINGS;
        $tblProduct = TBL::TBL_PRODUCTS;
        $tblCustomer = TBL::TBL_CUSTOMERS;
        $tblPlan = TBL::TBL_PLANS;
        $tblVendorService = TBL::TBL_VENDOR_SERVICES;

        $rule = [
            'vendor_id' => ['required','integer', 'exists:vendors,vendor_id'],
            'booked_cd' => ['required','exists:bookings,booked_cd'],
            "columns.$tblBooking" => ['required','array',Rule::in($booking->getColumns())],
            "columns.$tblProduct" => ['array', Rule::in($product->getColumns())],
            "columns.$tblVendorService" => ['array', Rule::in($vendorService->getColumns())],
            "columns.$tblPlan" => ['array',"required_with:columns.$tblCustomer",Rule::in($plan->getColumns())],
            "columns.$tblCustomer" => ['array', Rule::in($customer->getColumns())],

        ];


        return $rule;
    }

}
