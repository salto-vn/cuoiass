<?php
/**
 * Created by PhpStorm.
 * Email: 'hongduyphp@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


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

    public function getMenuWithProduct($serviceCode, $vendorId)
    {
        $tblMenus = TableName::TBL_MENUS;
        $tblFoods = TableName::TBL_FOODS;
        $tblProducts = TableName::TBL_PRODUCTS;
        $tblVendorServices = TableName::TBL_VENDOR_SERVICES;
        $selCols = ["$tblMenus.menu_id", "$tblMenus.menu_name", "$tblMenus.unit_price"
            , "$tblFoods.food_id", "$tblFoods.food_name", "$tblFoods.unit_price", "$tblFoods.image_ids"];
        $menus = $this->model->newQuery()->select($selCols)
            ->join("$tblFoods", "$tblMenus.menu_id", "=", "$tblFoods.menu_id")
            ->join("$tblProducts", "$tblMenus.prd_id", "=", "$tblProducts.prd_id")
            ->join("$tblVendorServices", "$tblProducts.vendor_service_id", "=", "$tblVendorServices.vendor_service_id")
            ->where("$tblProducts.service_code", "=", "$serviceCode")
            ->where("$tblVendorServices.vendor_id", "=", $vendorId)
            ->get();

        //Get Image Product
        $rs = [];
        $newMenus = [];
        $foods = [];
        foreach ($menus as $menu) {
            $images = explode(",", trim($menu['image_ids']));
            $food_imgs = array_map(function ($imageId) {
                $rs = Image::query()->find($imageId, ['img_url']);
                return $rs['img_url'];
            }, $images);

            $foods[] = ["food_id" => $menu['food_id'], "food_name" => $menu['food_name'],
                "unit_price" => $menu['unit_price'], "food_images" => $food_imgs];
            if (in_array($menu["menu_id"], $newMenus)) {

                $rs[] = ["id" => $menu["menu_id"], "name" => $menu["menu_name"], "foods" => $foods];
                $foods = [];
                $newMenus = [];
            }
            $newMenus[] = $menu["menu_id"];

        }
        return $rs;

    }


}
