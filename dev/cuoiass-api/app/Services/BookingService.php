<?php
/**
 * Created by PhpStorm.
 * User: mulodo-imac
 * Date: 12/12/18
 * Time: 6:40 PM
 */

namespace App\Services;

use App\Utils\TableName as TBL;
use Illuminate\Support\Facades\Log;

class BookingService
{

    private $bookingRepo;

    public function __construct(\App\Repositories\BookingRepo $bookingRepo)
    {
        $this->bookingRepo = $bookingRepo;
    }

    public function getBookingByCd($booked_cd, $cols)
    {
        $tblBooking = TBL::TBL_BOOKINGS;
        $tblProduct = TBL::TBL_PRODUCTS;
        $tblPlan = TBL::TBL_PLANS;
        $tlbCustomer = TBL::TBL_CUSTOMERS;

        $booking = $this->bookingRepo->getBookingByCd($booked_cd, $cols);

        //Repare data
        //Booking info
        if (isset($cols[$tblBooking]))
        foreach ($cols[$tblBooking] as $col) {
            $rs[$col] = $booking[$col];
        }
        //Plan info
        if (isset($cols[$tblPlan]))
        foreach ($cols[$tblPlan] as $col) {
            $rs[$tblPlan][$col] = $booking[$col];
        }
        //Product info
        if (isset($cols[$tblProduct]))
            foreach ($cols[$tblProduct] as $col) {
                $rs[$tblProduct][$col] = $booking[$col];
            }

        //Customer info
        if (isset($cols[$tlbCustomer]))
        foreach ($cols[$tlbCustomer] as $col) {
            $rs[$tlbCustomer][$col] = $booking[$col];
        }
        return $rs;
    }
}
