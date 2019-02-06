<?php
/**
 * Created by PhpStorm.
 * Email: 'Anh'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;
use App\Models\Food;

/**
 * Class FoodRepo
 *
 * @property Food $model
 * @method Food create(array $attributes)
 */
class FoodRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = Food::class;
        return $this->model;
    }
}
