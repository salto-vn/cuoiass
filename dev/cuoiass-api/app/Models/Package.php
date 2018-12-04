<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
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

	protected $casts = [
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
