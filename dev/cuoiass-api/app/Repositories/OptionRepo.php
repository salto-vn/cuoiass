<?php
/**
 * Created by PhpStorm.
 * Email: 'Anh'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;
use App\Models\Drink;

/**
 * Class MenuRepo
 *
 * @property Drink $model
 * @method Drink create(array $attributes)
 */
class DrinkRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = Drink::class;
        return $this->model;
    }
}
