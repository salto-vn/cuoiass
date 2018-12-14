<?php

namespace App\Api;

use App\Exceptions\VeltraException;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Contracts\Cache\Repository as Cache;
use Illuminate\Support\Facades\Log;

class Veltra implements Contracts\Factory
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
            'base_uri' => $config['base_uri'],
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
            'http_errors' => false,
            'timeout' => 60.0,
        ]);

        $this->setDefaultParams($config['common']);
        $this->cache = $cache;
    }

    /**
     * @param string $path
     * @param array $params
     * @param string $cacheKey
     * @return mixed
     * @throws GuzzleException
     */
    public function request($path, $params = [], $cacheKey = null)
    {
        if ($cacheKey === null) {
            $cacheKey = $this->prepareCacheKey($path, $params);
        }

        if ($this->cache->has($cacheKey)) {
            return $this->cache->get($cacheKey);
        }

        $result = $this->requestNoCache($path, $params);

        $this->cache->put($cacheKey, $result, \Constant::API_CACHE_EXPIRE);

        return $result;
    }

    /**
     * @param string $path
     * @param array $params
     * @return object
     * @throws GuzzleException
     */
    public function requestNoCache($path, $params = [])
    {
        # Not log common and credit card info
        Log::info('API request: ' . $path . PHP_EOL . json_encode(isset($params['credit_card']) ? array_except($params, ['credit_card']) : $params));
        $params = array_merge($this->params, $params);
        $response = $this->client->request('POST', $path, ['json' => $params]);

        $body = $response->getBody();
        $result = json_decode($body);

        if (400 <= $statusCode = $response->getStatusCode()) {
            Log::alert('API response: ' . $statusCode . PHP_EOL . $body);

            throw new VeltraException($statusCode, $path, $result->common->error_code ?? null);
        }

        return $result;
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

    /**
     * @param array $params
     */
    private function setDefaultParams($params)
    {
        $this->params = [
            'common' => $params,
        ];
    }
}
