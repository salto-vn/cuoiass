<?php

namespace App\Repositories;

use App\Models\Image;
use Illuminate\Support\Facades\Cache;

/**
 * Class ImageRepo.
 * @property Image $model
 * @method Image create(array $attributes)
 */
class ImageRepo extends Repository
{
    public $model;
    /**
     * @return string
     *  Return the model
     */
    public function getModel()
    {
        $this->model = Image::class;
        return Image::class;
    }

    /**
     * @return string
     */
    public function cacheKey($id)
    {
        return sprintf(
            "%s:%s",
            $this->getTable(),
            $id
        );
    }

    public function all($columns = ['*'])
    {
        $rs = parent::all($columns);
       return array_map(function($image){
            Cache::remember($this->cacheKey($image['img_id']), 1440, function () use ($image) {
                return $image['img_url'];
            });
        },$rs);
    }

    public function find($id, $columns = ['*'])
    {
        return Cache::remember($this->cacheKey($id), 1440, function () use ($id) {
            return parent::find($id, ['img_url']);
        });
    }

    public function findByIds($ids) {
        return array_map(function($id){
            return Cache::remember($this->cacheKey($id), 1440, function () use ($id) {
                return parent::find($id, ['img_url']);
            });
        },$ids);

    }
}
