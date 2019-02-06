<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Validator::extend('not_exists', function($attribute, $value, $parameters, $validator) {
            return DB::table($parameters[0])
                    ->where($parameters[1], '=', $value)
                    ->andWhere($parameters[2], '<>', $value)
                    ->count()<1;
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

        if (config('app.debug') == true) {
            // SQL Log
            DB::listen(function ($query) {
                $sql = $query->sql;
                for ($i = 0; $i < count($query->bindings); $i++) {
                    $sql = preg_replace("/\?/", $query->bindings[$i], $sql, 1);
                }

                Log::debug("SQL", ["time" => sprintf("%.2f ms", $query->time), "sql" => $sql]);
            });
        }

    }
}
