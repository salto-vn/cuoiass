<?php
/**
 * Created by PhpStorm.
 * Email: 'hongduyphp@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Drink;
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
     * @param $serviceCode
     * @param $vendorId
     * @param $search
     * @return array
     */
    public function getMenuWithFoods($vendorId, $search)
    {
        $tblMenus = TableName::TBL_MENUS;
        $tblFoods = TableName::TBL_FOODS;
        $tblProducts = TableName::TBL_PRODUCTS;
        $tblVendorServices = TableName::TBL_VENDOR_SERVICES;
        $imageRepo = new ImageRepo();
        $fieldsSearchable = [
            'menu_name', 'menu_price', 'service_code'
        ];
        $selCols = ["$tblMenus.menu_id", "$tblMenus.menu_name", "$tblMenus.unit_price as menu_price"
            , "$tblFoods.food_id", "$tblFoods.food_name", "$tblFoods.unit_price", "$tblFoods.image_ids"];
        $query = $this->model->newQuery()->select($selCols)
            ->join("$tblFoods", "$tblMenus.menu_id", "=", "$tblFoods.menu_id")
            ->join("$tblProducts", "$tblMenus.prd_id", "=", "$tblProducts.prd_id")
            ->join("$tblVendorServices", "$tblProducts.vendor_service_id", "=", "$tblVendorServices.vendor_service_id");

        //Custom search word
        $serviceCode = '';
        if ($search && is_array($fieldsSearchable) && count($fieldsSearchable)) {
            $searchData = $this->parserSearchData($search);
            if ($searchData) {
                foreach ($searchData as $field => $value) {
                    if (!in_array($field, $fieldsSearchable)) {
                        continue;
                    }

                    $value = addslashes($value);
                    if (!empty($value)) {
                        if ($field == 'service_code') {
                            $serviceCode = $value;
                        } else {
                            $query->where("$tblMenus.$field", 'like', "%{$value}%");
                        }

                    }

                }
            }
        }
        $query->where("$tblProducts.service_code", "=", "$serviceCode");
        $query->where("$tblVendorServices.vendor_id", "=", $vendorId);
        $query->orderBy("$tblMenus.menu_id");
        $menus = $query->get();
        //Get Image Product
        $rs = [];
        $foods = [];
        $menu_ids = [];
        for ($i = 0; $i < count($menus); $i++) {
            $menu = $menus[$i];
            $images = explode(",", trim($menu['image_ids']));
            $food_imgs = $imageRepo->findByIds($images);
            $foods[] = ["id" => $menu['food_id'], "name" => $menu['food_name'],
                "unit_price" => $menu['unit_price'], "images" => $food_imgs];
            if ($i == count($menus) - 1) {
                $drinks = Drink::query()->select(['drink_id', 'drink_name', 'unit_price', 'image_ids'])
                    ->where("menu_id", "=", $menu["menu_id"])
                    ->get();
                $drinks->map(function ($d) use ($imageRepo) {
                    $images = explode(",", trim($d['image_ids']));
                    $d['id'] = $d['drink_id'];
                    $d['name'] = $d['drink_name'];
                    $d['images'] = $imageRepo->findByIds($images);
                    unset($d['image_ids']);
                    unset($d['drink_id']);
                    unset($d['drink_name']);
                    return $d;
                });

                $rs[] = ["id" => $menu["menu_id"], "name" => $menu["menu_name"], "foods" => $foods, "drinks" => $drinks];
                $menu_ids[] = $menu["menu_id"];
                $foods = [];
            } else {
                if ($menu['menu_id'] !== $menus[$i + 1]['menu_id']) {
                    $drinks = Drink::query()->select(['drink_id', 'drink_name', 'unit_price', 'image_ids'])
                            ->where("menu_id", "=", $menu["menu_id"])
                            ->get();
                    $drinks->map(function ($d) use ($imageRepo) {
                        $images = explode(",", trim($d['image_ids']));
                        $d['id'] = $d['drink_id'];
                        $d['name'] = $d['drink_name'];
                        $d['images'] = $imageRepo->findByIds($images);
                        unset($d['image_ids']);
                        unset($d['drink_id']);
                        unset($d['drink_name']);
                        return $d;
                    });

                    $rs[] = ["id" => $menu["menu_id"], "name" => $menu["menu_name"], "foods" => $foods, "drinks" => $drinks];
                    $menu_ids[] = $menu["menu_id"];
                    $foods = [];
                }
            }

        }

        return $rs;

    }
}
