<?php

namespace App\Api\Contracts;

interface Factory
{
    public function request($path,$method, $params = [], $cacheKey = null);

    public function requestNoCache($path, $method, $params = []);

    public function prepareCacheKey($path, $params = []);
}
