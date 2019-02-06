<?php
/**
 * Created by PhpStorm.
 * Email: 'Anh'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;
use App\Models\SchedulePhoto;

/**
 * Class SchedulePhotoRepo
 * @package App\Repositories
 */
class SchedulePhotoRepo extends Repository
{
    public $model;

    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        $this->model = SchedulePhoto::class;
        return $this->model;
    }

}
