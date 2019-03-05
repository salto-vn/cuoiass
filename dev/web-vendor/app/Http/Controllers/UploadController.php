<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $images = array();
        $this->validate($request, [
            'files' => 'required|array',
            'files.*' => 'image',
        ]);

        if($files = $request->file('files')){
            foreach($files as $file){
                /**TODO: Upload image file to Google Storage,
                 * TODO: Use https://packagist.org/packages/websight/l5-google-cloud-storage
                 **/
                //$name = $file->getClientOriginalName();
                $file->move("tmp");
                //TODO:Hard data,
                $images[] = "https://lorempixel.com/640/480/?91152";
            }
        }
        return response()->json($images);
    }
}
