<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 04:42:06 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class PackageProduct
 * 
 * @property int $id
 * @property int $prd_id
 * @property int $package_id
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Package $package
 * @property \App\Models\Product $product
 *
 * @package App\Models
 */
class PackageProduct extends Eloquent
{
	public $incrementing = false;

	protected $casts = [
		'id' => 'int',
		'prd_id' => 'int',
		'package_id' => 'int'
	];

	protected $fillable = [
		'prd_id',
		'package_id',
		'created_by',
		'updated_by'
	];

	public function package()
	{
		return $this->belongsTo(\App\Models\Package::class);
	}

	public function product()
	{
		return $this->belongsTo(\App\Models\Product::class, 'prd_id');
	}
}
