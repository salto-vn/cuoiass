<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Menu
 * 
 * @property int $menu_id
 * @property string $menu_name
 * @property float $unit_price
 * @property int $prd_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Product $product
 * @property \Illuminate\Database\Eloquent\Collection $booked_foods
 * @property \Illuminate\Database\Eloquent\Collection $drinks
 * @property \Illuminate\Database\Eloquent\Collection $foods
 *
 * @package App\Models
 */
class Menu extends Eloquent
{
	protected $primaryKey = 'menu_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'menu_id' => 'int',
		'unit_price' => 'float',
		'prd_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'menu_name',
		'unit_price',
		'prd_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function product()
	{
		return $this->belongsTo(\App\Models\Product::class, 'prd_id');
	}

	public function booked_foods()
	{
		return $this->hasMany(\App\Models\BookedFood::class);
	}

	public function drinks()
	{
		return $this->hasMany(\App\Models\Drink::class);
	}

	public function foods()
	{
		return $this->hasMany(\App\Models\Food::class);
	}
}
