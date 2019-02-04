<?php
/**
 * Created by PhpStorm.
 * Email: 'hongduyphp@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Drink;
use App\Models\Food;
use App\Models\Image;
use App\Models\Menu;
use App\Utils\TableName;

/**
 * Class MenuRepo
 *
 * @property Menu $model
 * @method Menu create(array $attributes)
 */
class MenuRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = Menu::class;
        return $this->model;
    }

    /**
     * Get Menu , Foods info by vendor
     * @param $vendorId
     * @param $menu_type
     * @param $search
     * @return array
     */
    public function getMenuWithFoods($vendorId, $menu_type, $service_code, $search)
    {
        $tblMenus = TableName::TBL_MENUS;
        $tblProducts = TableName::TBL_PRODUCTS;
        $tblVendorServices = TableName::TBL_VENDOR_SERVICES;
        $imageRepo = new ImageRepo();
        $fieldsSearchable = [
            'menu_name', 'menu_price'
        ];
        $selCols = ["$tblMenus.menu_id as id", "$tblMenus.menu_name as name", "$tblMenus.unit_price as menu_price"];
        $query = $this->model->newQuery()->select($selCols)
            ->join("$tblProducts", "$tblMenus.prd_id", "=", "$tblProducts.prd_id")
            ->join("$tblVendorServices", "$tblProducts.vendor_service_id", "=", "$tblVendorServices.vendor_service_id");

        //Custom search word
        if ($search && is_array($fieldsSearchable) && count($fieldsSearchable)) {
            $searchData = $this->parserSearchData($search);
            if ($searchData) {
                foreach ($searchData as $field => $value) {
                    if (!in_array($field, $fieldsSearchable)) {
                        continue;
                    }

                    $value = addslashes($value);
                    if (!empty($value)) {
                        $query->where("$tblMenus.$field", 'like', "%{$value}%");
                    }

                }
            }
        }
        $query->where("$tblProducts.service_code", "=", "$service_code");
        $query->where("$tblVendorServices.vendor_id", "=", $vendorId);
        $query->orderBy("$tblMenus.menu_id");
        $menus = $query->get();
        //Get Image Product
        $rs = $menus->map(function ( $menu) use ($menu_type, $imageRepo) {
            if (strtolower($menu_type) == 'food') {
                $foods = Food::query()->select(["food_id as id", "food_name as name", "unit_price", "image_ids"])
                    ->where("menu_id", "=", $menu["id"])
                    ->get()
                    ->map(function ($food) use ($imageRepo) {
                        $images = explode(",", trim($food['image_ids']));
                        $food['images'] = $imageRepo->findByIds($images);
                        unset($food['image_ids']);
                        return $food;
                    });
                $menu['foods'] = $foods;
            } else {
                $drinks = Drink::query()->select(['drink_id as id', 'drink_name as name', 'unit_price', 'image_ids'])
                    ->where("menu_id", "=", $menu["id"])
                    ->get()
                    ->map(function ($drink) use ($imageRepo) {
                        $images = explode(",", trim($drink['image_ids']));
                        $drink['images'] = $imageRepo->findByIds($images);
                        unset($drink['image_ids']);
                        return $drink;
                    });
                $menu['drinks'] = $drinks;
            }
            return $menu;
        }, $menus);

        return $rs;
    }



    /**
     * @param $bookedId
     * @return Collection|static[]
     */
    public function getMenuBookedId($bookedId)
    {

        $tblBookedFood = TBL::TBL_BOOKED_FOODS;
        $tblFood = TBL::TBL_FOODS;
        $tblProduct = TBL::TBL_PRODUCTS;
        $tblMenu = TBL::TBL_MENUS;
        $tblBooking = TBL::TBL_BOOKINGS;
        $selCols = ["$tblMenu.menu_id as id", "$tblMenu.menu_name as name", "$tblMenu.unit_price as menu_price"];
        $query = $this->model->newQuery()->select([
            $selCols
            //"$tblBookedFood.booked_menu", "$tblBookedFood.service_code", "$tblBookedFood.booked_total",
            //"$tblFood.food_id as id", "$tblFood.food_name as name", "$tblFood.unit_price", "$tblFood.image_ids"
        ])
            ->join($tblMenu, "$tblBookedFood.menu_id", "=", "$tblMenu.menu_id")
            ->join($tblProduct, "$tblMenu.prd_id", "=", "$tblProduct.prd_id")
            ->join($tblFood, "$tblMenu.menu_id", "=", "$tblFood.menu_id")
            ->join($tblBooking, function($join) use  ($tblBooking, $tblProduct, $tblBookedFood){
                $join->on("$tblBooking.prd_id", '=', "$tblProduct.prd_id");
                $join->on("$tblBooking.booked_id", '=', "$tblBookedFood.booked_id");
                $join->on("$tblBooking.vendor_service_id", '=', "$tblProduct.vendor_service_id");
            })
            ->where("$tblBookedFood.booked_id", "=", $bookedId);
        return $query->get();
    }

}
