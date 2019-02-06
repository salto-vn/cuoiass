<?php
/**
 * Created by PhpStorm.
 * Email: 'Anh'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;
use App\Models\CustomizeField;

/**
 * Class CustomizeFieldRepo
 *
 * @property CustomizeField $model
 */
class CustomizeFieldRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = CustomizeField::class;
        return $this->model;
    }

}
