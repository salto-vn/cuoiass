<?php
/**
 * Created by PhpStorm.
 * User: mulodo-imac
 * Date: 12/12/18
 * Time: 6:40 PM
 */

namespace App\Services;

use App\Models\CustomizeField;
use App\Models\Menu;
use App\Models\Option;
use App\Models\SchedulePhoto;
use App\Repositories\CustomizeFieldRepo;
use App\Repositories\DrinkRepo;
use App\Repositories\FoodRepo;
use App\Repositories\ImageRepo;
use App\Repositories\MenuRepo;
use App\Repositories\OptionRepo;
use App\Repositories\ProductRepo;
use App\Repositories\SchedulePhotoRepo;
use App\Utils\TableName as TBL;
use Illuminate\Support\Facades\DB;

class ProductService
{

    private $productRepo;
    private $imageRepo;
    private $customizeFieldRepo;
    private $optionRepo;
    private $schedulePhotoRepo;
    private $menuRepo;
    private $foodRepo;
    private $drinkRepo;

    /**
     * ProductService constructor.
     * @param ProductRepo $productRepo
     * @param ImageRepo $imageRepo
     * @param CustomizeFieldRepo $customizeFieldRepo
     * @param OptionRepo $optionRepo
     * @param SchedulePhotoRepo $schedulePhotoRepo
     * @param MenuRepo $menuRepo
     * @param FoodRepo $foodRepo
     * @param DrinkRepo $drinkRepo
     */
    public function __construct(ProductRepo $productRepo,
                                ImageRepo $imageRepo,
                                CustomizeFieldRepo $customizeFieldRepo,
                                OptionRepo $optionRepo,
                                SchedulePhotoRepo $schedulePhotoRepo,
                                MenuRepo $menuRepo,
                                FoodRepo $foodRepo,
                                DrinkRepo $drinkRepo)
    {
        $this->productRepo = $productRepo;
        $this->imageRepo = $imageRepo;
        $this->customizeFieldRepo = $customizeFieldRepo;
        $this->optionRepo = $optionRepo;
        $this->schedulePhotoRepo = $schedulePhotoRepo;
        $this->menuRepo = $menuRepo;
        $this->foodRepo = $foodRepo;
        $this->drinkRepo = $drinkRepo;

    }

    /**
     * @param $product
     * @param string $customizeFields
     * @param string $options
     * @param string $schedulePhotos
     * @param string $menu_foods
     * @param string $menu_drinks
     */
    public function create($product, $customizeFields = "", $options = ""
        , $schedulePhotos = "", $menu_foods = "", $menu_drinks = "")
    {
        return DB::transaction(function () use ($product, $customizeFields, $options, $schedulePhotos, $menu_foods, $menu_drinks) {
            $prd_images = "";
            $created_by = 'admin@gmail.com';//TODO:
            if (isset($product['images'])) {
                $keys = array_map(function ($image) use ($created_by) {
                    return $this->imageRepo->create(["img_url" => addslashes($image), "created_by" => addslashes($created_by)])->getKey();
                }, $product['images']);
                $prd_images = join(",", $keys);
            }
            unset($product['images']);
            $product['prd_images'] = $prd_images;
            $product['created_by'] = $created_by;
            $product['publish_flag'] = '0'; //Unpublished
            $inserted = $this->productRepo->create($product);
            $return_value = $inserted;
            //Customize Field insert

            if ($inserted && !empty($customizeFields)) {
                $return_cusfields = array_map(function ($field) use ($inserted) {
                    $field['prd_id'] = $inserted->getKey();
                    $field['vendor_service_id'] = $inserted['vendor_service_id'];
                    $field['created_by'] = $inserted['created_by'];
                    return $this->customizeFieldRepo->create($field);
                }, $customizeFields);
                $return_value['customize_fields'] = $return_cusfields;

            }
            // Option Insert
            if ($inserted && !empty($options)) {
                $return_options = array_map(function ($option) use ($inserted, $created_by) {
                    $option_images = "";
                    if (isset($option['images'])) {
                        $keys = array_map(function ($image) use ($created_by) {
                            return $this->imageRepo->create(["img_url" => addslashes($image), "created_by" => addslashes($created_by)])->getKey();
                        }, $option['images']);
                        $option_images = join(",", $keys);
                    }

                    $option['prd_id'] = $inserted->getKey();
                    $option['image_ids'] = $option_images;
                    $option['vendor_service_id'] = $inserted['vendor_service_id'];
                    $option['created_by'] = $inserted['created_by'];
                    return $this->optionRepo->create($option);
                }, $options);

                $return_value['options'] = $return_options;
            }

            //Schedule Photo
            if ($inserted && !empty($schedulePhotos)) {
                $return_schedule = array_map(function ($schedulePhoto) use ($inserted, $created_by) {
                    $schedule_images = "";
                    if (isset($schedulePhoto['images'])) {
                        $keys = array_map(function ($image) use ($created_by) {
                            return $this->imageRepo->create(["img_url" => addslashes($image), "created_by" => addslashes($created_by)])->getKey();
                        }, $schedulePhoto['images']);
                        $schedule_images = join(",", $keys);
                    }
                    $option['image_ids'] = $schedule_images;
                    $schedulePhoto['prd_id'] = $inserted->getKey();
                    $schedulePhoto['created_by'] = $inserted['created_by'];
                    return $this->schedulePhotoRepo->create($schedulePhoto);
                }, $schedulePhotos);

                $return_value['schedule_photos'] = $return_schedule;
            }

            //Menu Foods
            if ($inserted && !empty($menu_foods)) {
               $return_menu_food = array_map(function ($menu_food) use ($inserted, $created_by) {
                    //insert menu
                    $menu = [
                        'menu_name' => $menu_food['menu_name'],
                        'unit_price' => $menu_food['unit_price'],
                        'prd_id' => $inserted->getKey(),
                        'created_by' => $created_by
                    ];
                    $inserted_menu = $this->menuRepo->create($menu);
                    if (isset($menu_food['foods'])) {
                        $return_foods = array_map(function ($food) use ($inserted, $inserted_menu, $created_by) {
                            $food_images = "";
                            if (isset($food['images'])) {
                                $keys = array_map(function ($image) use ($created_by) {
                                    return $this->imageRepo->create(["img_url" => addslashes($image), "created_by" => addslashes($created_by)])->getKey();
                                }, $food['images']);
                                $food_images = join(",", $keys);
                            }
                            $food['menu_id'] = $inserted_menu->getKey();
                            $food['created_by'] = $created_by;
                            $food['image_ids'] = $food_images;
                            return $this->foodRepo->create($food);
                        }, $menu_food['foods']);
                        $inserted_menu['foods'] = $return_foods;
                    }
                   return $inserted_menu;
                }, $menu_foods);
                $return_value['menu_food'] = $return_menu_food;
            }

            //Menu Drink
            if ($inserted && !empty($menu_drinks)) {
                $return_menu_drink = array_map(function ($menu_drink) use ($inserted, $created_by) {
                    //insert menu
                    $menu = [
                        'menu_name' => $menu_drink['menu_name'],
                        'unit_price' => $menu_drink['unit_price'],
                        'prd_id' => $inserted->getKey(),
                        'created_by' => $created_by
                    ];
                    $inserted_menu = $this->menuRepo->create($menu);
                    if (isset($menu_drink['drinks'])) {
                        $return_drinks = array_map(function ($drink) use ($inserted, $inserted_menu, $created_by) {
                            $drink_images = "";
                            if (isset($drink['images'])) {
                                $keys = array_map(function ($image) use ($created_by) {
                                    return $this->imageRepo->create(["img_url" => addslashes($image), "created_by" => addslashes($created_by)])->getKey();
                                }, $drink['images']);
                                $drink_images = join(",", $keys);
                            }
                            $drink['menu_id'] = $inserted_menu->getKey();
                            $drink['created_by'] = $created_by;
                            $drink['image_ids'] = $drink_images;
                            return $this->drinkRepo->create($drink);
                        }, $menu_drink['drinks']);
                        $inserted_menu['drinks'] = $return_drinks;
                    }
                    return $inserted_menu;
                }, $menu_drinks);
                $return_value['menu_drink'] = $return_menu_drink;
            }

            return $return_value;
        });
    }
}
