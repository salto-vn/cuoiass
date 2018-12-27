<?php
/**
 * Created by PhpStorm.
 * Email: 'hongduyphp@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\MasterService;

/**
 * Class ServiceRepo
 *
 * @property MasterService $model
 * @method MasterService create(array $attributes)
 */
class ServiceRepo extends Repository
{
    public $model;
    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = MasterService::class;
        return $this->model;
    }


}
