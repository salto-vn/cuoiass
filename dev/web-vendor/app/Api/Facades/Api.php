<?php

namespace App\Api\Facades;

use App\Api\Contracts\Factory;
use Illuminate\Support\Facades\Facade;

/**
 * @see \App\Api\Veltra
 */
class Api extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return Factory::class;
    }
}
