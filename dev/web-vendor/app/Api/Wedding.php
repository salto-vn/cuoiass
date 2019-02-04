<?php

namespace App\Api;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Cache\Repository as Cache;

class Wedding implements Contracts\Factory
{
    /**
     * @var Client
     */
    protected $client;

    /**
     * @var array
     */
    protected $params;

    /**
     * The cache instance.
     * @var Cache
     */
    protected $cache;

    /**
     * Api constructor.
     *
     * @param Cache $cache
     * @param $config
     */
    public function __construct(Cache $cache, $config)
    {
        $this->client = new Client([
            'base_uri' => config('wedding.api_url'),
            'http_errors' => false,
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
            'verify' => false
        ]);
        $this->params['common'] = config('wedding.common');
        $this->cache = $cache;
    }

    /**
     * @param string $path
     * @param array $params
     * @param string $cacheKey
     * @return mixed
     * @throws GuzzleException
     */
    public function request($path, $method, $params = [], $cacheKey = null)
    {

        if ($cacheKey === null) {
            $cacheKey = $this->prepareCacheKey($path, $params);
        }


        if ($this->cache->has($cacheKey)) {
            return $this->cache->get($cacheKey);
        }

        $result = $this->requestNoCache($path, $method, $params);
//        $this->cache->put($cacheKey, json_encode(json_decode($result)), 1440);

        return $result;
    }

    /**
     * @param string $path
     * @param array $params
     * @return object
     * @throws GuzzleException
     */
    public function requestNoCache($path, $method, $params = [])
    {
        $params = array_merge($this->params, $params);

        $response = $this->client->request($method, $path, ['json' => $params]);
        return $response;
    }

    /**
     * @param string $path
     * @param array $params
     * @return string
     */
    public function prepareCacheKey($path, $params = [])
    {
        return md5(sprintf("%s.%s", $path, json_encode($params)));
    }

}
