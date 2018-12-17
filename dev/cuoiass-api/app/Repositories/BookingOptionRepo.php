<?php
/**
 * Created by PhpStorm.
 * Email: 'ngotuananh2606@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\BookedOption;

/**
 * Class BookingOptionRepo
 *
 * @property BookedOption $model
 * @method BookedOption create(array $attributes)
 */
class BookingOptionRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = BookedOption::class;
        return $this->model;
    }


}
