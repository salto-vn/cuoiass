<?php

namespace App\Api\Contracts;

interface Factory
{
    public function request($path, $params = [], $cacheKey = null);

    public function requestNoCache($path, $params = []);

    public function prepareCacheKey($path, $params = []);
}
