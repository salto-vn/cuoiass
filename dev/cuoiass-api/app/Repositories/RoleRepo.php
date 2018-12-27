<?php
/**
 * Created by PhpStorm.
 * Email: 'hongduyphp@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Role;

/**
 * Class RoleRepo
 *
 * @property Role $model
 * @method Role create(array $attributes)
 */
class RoleRepo extends Repository
{
    public $model;
    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = Role::class;
        return $this->model;
    }


}
