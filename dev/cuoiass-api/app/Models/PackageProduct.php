<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class PackageProduct
 * 
 * @property int $id
 * @property int $prd_id
 * @property int $package_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Package $package
 * @property \App\Models\Product $product
 *
 * @package App\Models
 */
class PackageProduct extends Eloquent
{
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'prd_id' => 'int',
		'package_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'prd_id',
		'package_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
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
