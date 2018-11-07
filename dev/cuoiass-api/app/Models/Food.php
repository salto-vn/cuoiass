<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 06:56:23 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

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
class Food extends Eloquent
{
	protected $primaryKey = 'food_id';

	protected $casts = [
		'menu_id' => 'int'
	];

	protected $fillable = [
		'food_name',
		'image_ids',
		'menu_id',
		'created_by',
		'updated_by'
	];

	public function menu()
	{
		return $this->belongsTo(\App\Models\Menu::class);
	}
}
