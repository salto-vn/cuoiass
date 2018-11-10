<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\GetRequest;
use App\Models\Review;
use App\Repositories\ReviewRepo;

class ReviewController extends Controller
{

    /**
     * ReviewRepository
     */
    private $reviewRepo;

    /**
     * AccountController constructor.
     * @param ReviewRepo $reviewRepo
     */
    public function __construct(ReviewRepo $reviewRepo)
    {
        $this->reviewRepo = $reviewRepo;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(GetRequest $request)
    {
        $page = (int)$request->get('page', \Constant::MIN_PAGE);
        $limit = (int)$request->get('limit', \Constant::MIN_LIMiT);
        $orderBy = $request->get('sortbyc', null);
        $sortBy = $request->get('sortby', \Constant::ORDER_BY_DESC);
        $search = $request->get('search');
        $model = $this->reviewRepo->getListAllData($search, $page, $limit, $orderBy, $sortBy);

        return $this->toJsonPaginate($model);
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
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  Review $review
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Review $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Review $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Review $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        //
    }
}
