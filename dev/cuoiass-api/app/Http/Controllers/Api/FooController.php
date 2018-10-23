<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class FooController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    protected $res = ['status'=> 'OK'];
    public function __invoke(Request $request)
    {
        //
    }


    public function index(Request $request)
    {
        $pitchers = collect([
            [
                'key'  => 'saito',
                'name' => '斎藤',
                'era'  => 1.62,
                'win'  => 20,
            ],
            [
                'key'  => 'makihara',
                'name' => '槇原',
                'era'  => 2.29,
                'win'  => 12,
            ],
            [
                'key'  => 'kuwata',
                'name' => '桑田',
                'era'  => 2.60,
                'win'  => 17,
            ],
        ]);

        return response()->json( $pitchers );
    }

    public function store(Request $request)
    {
        return response()->json($res);
    }

    public function show($id)
    {
        return response()->json($res);
    }

    public function update(Request $request, $id)
    {
        return response()->json($res);
    }

    public function destroy($id)
    {
        return response()->json($res);
    }
}
