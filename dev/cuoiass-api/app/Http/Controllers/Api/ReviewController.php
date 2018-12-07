<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\GetRequest;
use App\Http\Requests\Review\UpdateReview;
use App\Models\Image;
use App\Models\Review;
use App\Repositories\ReviewRepo;
use Illuminate\Http\Request;

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
        $orderBy = $request->get('orderBy', null);
        $order = $request->get('order', \Constant::ORDER_BY_DESC);
        $search = $request->get('search');
        $model = $this->reviewRepo->getListAllData($search, $page, $limit, $orderBy, $order);

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

        $review['product'] = $review->product()->get(["prd_id","prd_cd","prd_name","prd_desc", "prd_images"]);
        if (isset($review['product'][0])) {
            $images = explode(",",$review['product'][0]["prd_images"]);
            $imgs = array();
            foreach ($images as $img) {
                $img_url = Image::query()->find($img,["img_url"]);
                if (isset($img_url)) {
                    $imgs[] = $img_url->value("img_url");
                }

            }
            $review['product'][0]["prd_images"] = $imgs;
        }
        if (isset($review['review_imgs'])) {
            $images = explode(",",$review['review_imgs']);
            $imgs = array();
            foreach ($images as $img) {
                $img_url = Image::query()->find($img,["img_url"]);
                if (isset($img_url)) {
                    $imgs[] = $img_url->value("img_url");
                }

            }
            $review['review_imgs'] = $imgs;
        }
        $review['customer'] = $review->customer()->get(["customer_id","first_name","last_name","email"]);
        $review['booking'] = $review->booking()->get(["try_date", "activate_date","booked_date", "booked_cd","booked_pro_name"]);
        return response()->json($review);
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
     * @param UpdateReview $request
     * @param  Review $review
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReview $request, Review $review)
    {
        //
        $input = array_filter($request->validated());

        $input['updated_by'] = 'test@gmail.com';


        return tap($review)->update($input);

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
