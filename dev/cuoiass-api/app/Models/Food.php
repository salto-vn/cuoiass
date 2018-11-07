<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
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
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Menu $menu
 *
 * @package App\Models
 */
class Food extends Eloquent
{
	protected $primaryKey = 'food_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'food_id' => 'int',
		'menu_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'food_name',
		'image_ids',
		'menu_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function menu()
	{
		return $this->belongsTo(\App\Models\Menu::class);
	}
}
