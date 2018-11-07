<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Package
 * 
 * @property int $package_id
 * @property string $pacage_name
 * @property float $package_price
 * @property int $pub_user
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $products
 *
 * @package App\Models
 */
class Package extends Eloquent
{
	protected $primaryKey = 'package_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'package_id' => 'int',
		'package_price' => 'float',
		'pub_user' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'pacage_name',
		'package_price',
		'pub_user',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function products()
	{
		return $this->belongsToMany(\App\Models\Product::class, 'package_products', 'package_id', 'prd_id')
					->withPivot('id', 'create_by', 'create_at', 'update_by', 'update_at');
	}
}
