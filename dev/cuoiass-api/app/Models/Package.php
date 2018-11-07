<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 04:42:06 +0000.
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
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $products
 *
 * @package App\Models
 */
class Package extends Eloquent
{
	protected $primaryKey = 'package_id';
	public $incrementing = false;

	protected $casts = [
		'package_id' => 'int',
		'package_price' => 'float',
		'pub_user' => 'int'
	];

	protected $fillable = [
		'pacage_name',
		'package_price',
		'pub_user',
		'created_by',
		'updated_by'
	];

	public function products()
	{
		return $this->belongsToMany(\App\Models\Product::class, 'package_products', 'package_id', 'prd_id')
					->withPivot('id', 'created_by', 'updated_by')
					->withTimestamps();
	}
}
