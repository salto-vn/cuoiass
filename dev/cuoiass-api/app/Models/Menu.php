<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
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
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
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

	protected $casts = [
		'unit_price' => 'float',
		'prd_id' => 'int'
	];

	protected $fillable = [
		'menu_name',
		'unit_price',
		'prd_id',
		'created_by',
		'updated_by'
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
