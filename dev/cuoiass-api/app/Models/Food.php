<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use App\Repositories\ImageRepo;
use Illuminate\Support\Facades\Cache;

/**
 * Class Food
 *
 * @property int $food_id
 * @property string $food_name
 * @property string $image_ids
 * @property int $menu_id
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\Menu $menu
 *
 * @package App\Models
 */
class Food extends Model
{
	protected $primaryKey = 'food_id';

	protected $casts = [
		'menu_id' => 'int'
	];

	protected $fillable = [
		'food_name',
        'unit_price',
		'image_ids',
		'menu_id',
		'created_by',
		'updated_by'
	];

    /**
     * @return string
     */
    public function cacheKey()
    {
        return sprintf(
            "%s/%s-%s",
            $this->getTable(),
            $this->getKey(),
            $this->updated_at->timestamp
        );
    }

	public function menu()
	{
		return $this->belongsTo(\App\Models\Menu::class);
	}

	public function images() {
        return Cache::remember($this->cacheKey() . ':images', 1440, function () {
            $images = explode(",", trim($this->image_ids));
            $imageRepo = new ImageRepo();
            return $this->comments->toArray();
        });
    }
}
