<?php
/**
 * Created by PhpStorm.
 * User: mulodo-imac
 * Date: 12/12/18
 * Time: 6:40 PM
 */

namespace App\Services;

use App\Enums\ServiceCodeEnum;
use App\Models\Image;
use App\Repositories\BookingCustomizeRepo;
use App\Repositories\BookingDrinkRepo;
use App\Repositories\BookingFoodRepo;
use App\Repositories\BookingOptionRepo;
use App\Repositories\BookingRepo;
use App\Repositories\PromotionRepo;
use App\Utils\TableName as TBL;

class BookingService
{

    private $bookingRepo;
    private $bookingOptionRepo;
    private $bookingCustomizeRepo;
    private $bookingFoodRepo;
    private $bookingDrinkRepo;
    private $promotionRepo;

    /**
     * BookingService constructor.
     * @param BookingRepo $bookingRepo
     * @param BookingOptionRepo $bookingOptionRepo
     * @param BookingCustomizeRepo $bookingCustomizeRepo
     * @param BookingFoodRepo $bookingFoodRepo
     * @param BookingDrinkRepo $bookingDrinkRepo
     * @param PromotionRepo $promotionRepo
     */
    public function __construct(BookingRepo $bookingRepo, BookingOptionRepo $bookingOptionRepo
        , BookingCustomizeRepo $bookingCustomizeRepo
        , BookingFoodRepo $bookingFoodRepo
        , BookingDrinkRepo $bookingDrinkRepo
        , PromotionRepo $promotionRepo)
    {
        $this->bookingRepo = $bookingRepo;
        $this->bookingOptionRepo = $bookingOptionRepo;
        $this->bookingCustomizeRepo = $bookingCustomizeRepo;
        $this->bookingFoodRepo = $bookingFoodRepo;
        $this->bookingDrinkRepo = $bookingDrinkRepo;
        $this->promotionRepo = $promotionRepo;
    }

    /**
     * @param $vendor_id
     * @param $booked_cd
     * @param $cols
     * @return mixed
     */
    public function getBookingByCd($vendor_id, $booked_cd, $cols)
    {
        $tblBooking = TBL::TBL_BOOKINGS;
        $tblProduct = TBL::TBL_PRODUCTS;
        $tblPlan = TBL::TBL_PLANS;
        $tlbCustomer = TBL::TBL_CUSTOMERS;
        $tblVendorService = TBL::TBL_VENDOR_SERVICES;
        $tblPromotion = TBL::TBL_PROMOTIONS;

        $booking = $this->bookingRepo->getBookingByCd($vendor_id, $booked_cd, $cols);
        $rs = [];
        if ($booking) {
            //Get Booking options
            $options = $this->bookingOptionRepo->findByField("booked_id", $booking['booked_id'],
                ['booked_opt_id','option_id', 'option_name', 'option_quality', 'option_price']);

            //Get Customize Fields
            $customFields = $this->bookingCustomizeRepo->getBookedCusFldsByBookedId($booking['booked_id']);

            //Repair data
            //Booking info
            if (isset($cols[$tblBooking]))
                foreach ($cols[$tblBooking] as $col) {
                    $rs[$col] = $booking[$col];
                }

            //Promotion info
            if (isset($cols[$tblPromotion])){
                //Promotion code
                $promotion = $this->promotionRepo->findByField('promotion_code',$booking['promotion_code'],
                    $cols[$tblPromotion]);
                if (isset($promotion)) {
                    foreach ($cols[$tblPromotion] as $col) {
                        $rs['promotion'][$col] = $promotion[0][$col];
                    }
                }

            }


            //Vendor Service info
            if (isset($cols[$tblVendorService]))
                foreach ($cols[$tblVendorService] as $col) {
                    $rs['vendor_service'][$col] = $booking[$col];
                }
            //Plan info
            if (isset($cols[$tblPlan]))
                foreach ($cols[$tblPlan] as $col) {
                    $rs['plan'][$col] = $booking[$col];
                }
            //Product info
            if (isset($cols[$tblProduct])) {
                foreach ($cols[$tblProduct] as $col) {
                    $rs['product'][$col] = $booking[$col];
                }
                //Get Image Product
                $images = explode(",", trim($booking['prd_images']));
                $images = array_map(function ($imageId) {
                    $rs = Image::query()->find($imageId, ['img_url']);
                    return $rs['img_url'];
                }, $images);
                $rs['product']['prd_images'] = $images;
            }


            //Customer info
            if (isset($cols[$tlbCustomer]))
                foreach ($cols[$tlbCustomer] as $col) {
                    $rs['customer'][$col] = $booking[$col];
                }
            //options
            $rs['options'] = $options;

            //Customize Fields
            $rs['customize_fields'] = $customFields->map(function(&$field){
                $customize_field_keys = explode(",",$field['customize_field_key']);
                $customize_field_values = explode(",",$field['customize_field_value']);
                foreach($customize_field_keys as $index=>$key) {
                    $options[] = ['key'=>$key, 'value'=>$customize_field_values[$index]];
                }
                $field['customize_field_questions'] = $options;
                unset($field['customize_field_key']);
                unset($field['customize_field_value']);
                return $field;
            });

            //Get Booked Foods
            $foods = [];

            if (isset($booking['service_code']) &&
                (in_array($booking['service_code'], [ServiceCodeEnum::REST, ServiceCodeEnum::QUAC]))) {
                $foods = $this->bookingFoodRepo->getBookingFoodsByBookedId($booking['booked_id']);
                $drinks = $this->bookingDrinkRepo->getBookingDrinksByBookedId($booking['booked_id']);
                $rs['drinks'] = $drinks;
                $rs['foods'] = $foods;
            }
        }

        return $rs;
    }
}
