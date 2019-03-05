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
        $this->userAuth = ['vendor_id' => '6','staff_id' => '1'];
    }

    /**
     * @param $search
     *
     * @return array
     */
    public function parserSearchData($search)
    {
        $searchData = [];

        if (stripos($search, ':')) {
            $fields = explode(';', $search);

            foreach ($fields as $row) {
                try {
                    list($field, $value) = explode(':', $row);
                    $searchData[$field] = $value;
                } catch (\Exception $e) {
                    //Surround offset error
                }
            }
        }

        return $searchData;
    }
}
