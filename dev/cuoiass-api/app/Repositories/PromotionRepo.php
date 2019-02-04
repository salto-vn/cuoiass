<?php
/**
 * Created by PhpStorm.
 * Email: 'hongduyphp@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Promotion;

/**
 * Class PromotionRepo
 *
 * @property Promotion $model
 * @method Promotion create(array $attributes)
 */
class PromotionRepo extends Repository
{
    public $model;
    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = Promotion::class;
        return $this->model;
    }


}
