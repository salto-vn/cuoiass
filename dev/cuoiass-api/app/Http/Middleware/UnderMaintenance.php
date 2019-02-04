<?php

namespace App\Http\Middleware;

use Closure;

class UnderMaintenance
{
    /**
     * メンテナンスチェック
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (env('APP_MAINTENANCE', false) === true) {
            // 503 Service Unavailable.
            return response()->maintenance();
        }

        return $next($request);
    }
}
