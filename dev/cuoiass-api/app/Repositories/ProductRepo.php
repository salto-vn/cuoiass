<?php
/**
 * Created by PhpStorm.
 * Email: 'Anh'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;
use App\Models\Product;

/**
 * Class ProductRepo
 *
 * @property Product $model
 * @method Product create(array $attributes)
 */
class ProductRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = Product::class;
        return $this->model;
    }

}
