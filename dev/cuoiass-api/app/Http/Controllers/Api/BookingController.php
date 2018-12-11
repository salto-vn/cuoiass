<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Booking\GetRequest;
use App\Models\Booking;
use App\Repositories\BookingRepo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BookingController extends Controller
{

    /**
     * @var BookingRep
     */
    private $bookingRepo;

    /**
     * StaffController constructor.
     * @param StaffRepo $staffRepo
     */
    public function __construct(BookingRepo $bookingRepo)
    {
        $this->bookingRepo = $bookingRepo;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(GetRequest $request)
    {
        //
        $page = (int)$request->get('page');
        $limit = (int)$request->get('limit');
        $orderBy = $request->get('orderBy', 'booked_cd');
        $sortBy = $request->get('order', \Constant::ORDER_BY_DESC);
        $search = $request->get('search');
        $data = $this->bookingRepo->getListBookingbyVendor($search, $page, $limit, $orderBy, $sortBy);

        return $this->toJsonPaginate($data);

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
     * @param Booking $booking
     * @return void
     */
    public function show(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Booking $booking
     * @return void
     */
    public function update(Request $request, Booking $booking)
    {
        //
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
