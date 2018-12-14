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

    /**
     * StaffController constructor.
     * @param Factory $api
     */
    public function __construct(Factory $api)
    {
        $this->api = $api;
    }
}
