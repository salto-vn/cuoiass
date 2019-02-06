<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProduct;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProduct $request)
    {
        //
        $input = array_filter($request->validated());
        $customizeFields = isset($input['customize_fields']) ? $input['customize_fields'] : "";
        $options = isset($input['options']) ? $input['options'] : "";
        $schedule_photos = isset($input['schedule_photos']) ? $input['schedule_photos'] : "";
        $menu_foods = isset($input['menu_foods']) ? $input['menu_foods'] : "";
        $menu_drinks = isset($input['menu_drinks']) ? $input['menu_drinks'] : "";
        $rs = $this->productService->create($input, $customizeFields, $options,$schedule_photos,$menu_foods,$menu_drinks);
        return response()->success($rs);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
