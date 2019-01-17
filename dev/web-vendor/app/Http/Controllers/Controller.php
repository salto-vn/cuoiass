<?php

namespace App\Http\Controllers;

use App\Api\Contracts\Factory;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    //
    /**
     * @var Factory
     */
    protected $api;

    protected $apiName = "";

    protected $userAuth;

    /**
     * StaffController constructor.
     * @param Factory $api
     */
    public function __construct(Factory $api)
    {
        $this->api = $api;

        //TODO: Vendor id
        $this->userAuth = ['vendor_id' => '3','staff_id' => '1'];
    }
}
