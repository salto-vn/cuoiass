<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Product\GetRequest;
use App\Repositories\ProductRepo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * @var ProductRepo
     */
    private $productRepo;

    /**
     * ProductController constructor.
     * @param ProductRepo $productRepo
     */
    public function __construct(ProductRepo $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    /**
     * @param GetRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(GetRequest $request)
    {
        $page = (int)$request->get('page');
        $limit = (int)$request->get('limit');
        $orderBy = $request->get('sortbyc', null);
        $sortBy = $request->get('sortby', \Constant::ORDER_BY_DESC);
        $search = $request->get('search');

        $data = $this->productRepo->getList($search, $page, $limit, $orderBy, $sortBy);

        return $this->toJsonPaginate($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
