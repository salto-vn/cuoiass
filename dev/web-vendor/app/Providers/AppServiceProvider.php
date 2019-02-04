<?php

namespace App\Providers;

use App\Api\Contracts\Factory;
use App\Api\Wedding;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Factory::class, function ($app) {
            return new Wedding($app['cache.store'], $app['config']['wedding']);
        });
    }
}
