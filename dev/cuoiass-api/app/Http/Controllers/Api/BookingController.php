<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Booking\GetRequest;
use App\Http\Requests\Booking\ShowRequest;
use App\Http\Requests\Booking\UpdateRequest;
use App\Models\Booking;
use App\Repositories\BookingRepo;
use App\Services\BookingService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{

    /**
     * @var BookingRep
     */
    private $bookingRepo;

    private $bookingService;

    /**
     * StaffController constructor.
     * @param BookingRepo $bookingRepo
     * @param BookingService $bookingService
     */
    public function __construct(BookingRepo $bookingRepo, BookingService $bookingService)
    {
        $this->bookingRepo = $bookingRepo;
        $this->bookingService = $bookingService;
    }


    /**
     * Display a listing of the resource.
     *
     * @param GetRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(GetRequest $request)
    {
        //
        $page = (int)$request->get('page');
        $limit = (int)$request->get('limit');
        $orderBy = $request->get('orderBy', 'booked_date');
        $sortBy = $request->get('order', \Constant::ORDER_BY_DESC);
        $search = $request->get('search');
        $vendor_id = $request->get('vendor_id');
        $data = $this->bookingRepo->getListBookingByVendor($vendor_id, $search, $page, $limit, $orderBy, $sortBy);

        return $this->toJsonPaginate($data);

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
     * @param ShowRequest $request
     * @return void
     */
    public function show(ShowRequest $request)
    {
        $params = $request->validated();
        $booked_cd = $params['booked_cd'];
        $vendor_id = $params['vendor_id'];
        $columns = $params['columns'];
        $response = $this->bookingService->getBookingByCd($vendor_id, $booked_cd, $columns);
        return response()->success($response);


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Booking $booking
     * @return void
     */
    public function update(UpdateRequest $request, Booking $booking)
    {
        //
        $input = array_filter($request->validated());
        $input['updated_by'] = 'test@gmail.com';
        $bookingBb = $this->bookingRepo->findByField('booked_cd',$input['booked_cd']);
        if (!empty($bookingBb)) {
            $rs = $this->bookingRepo->update($input, $bookingBb[0]['booked_id']);
        }

        return response()->success($rs);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Booking $booking
     * @return void
     */
    public function destroy(Booking $booking)
    {
        //
    }
}
