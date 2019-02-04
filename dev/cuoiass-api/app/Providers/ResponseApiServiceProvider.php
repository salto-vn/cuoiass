<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;

class ResponseApiServiceProvider extends ServiceProvider
{

    /**
     * Register Response marco
     * @return void
     */
    public function boot()
    {
        // Success (200 OK.)
        Response::macro('success', function ($data) {
            return response()->json([
                'status' => 'OK',
                'data' => $data
            ]);
        });

        // Error (4xx, 5xx)
        Response::macro('error', function ($message, array $errors = [], $status = ResponseStatus::HTTP_INTERNAL_SERVER_ERROR) {
            return response()->json([
                'message' => $message,
                'errors'  => (object) $errors
            ], $status);
        });

        // Under Maintenance (503 Service Unavailable.)
        Response::macro('maintenance', function () {
            return response()->json([
                'message' => 'Site is under maintenance.',
                'errors'  => (object) []
            ], ResponseStatus::HTTP_SERVICE_UNAVAILABLE);
        });
    }

}
