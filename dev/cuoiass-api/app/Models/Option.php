<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 04:42:06 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Option
 * 
 * @property int $option_id
 * @property int $prd_id
 * @property int $vendor_service_id
 * @property string $option_name
 * @property string $image_ids
 * @property float $option_price
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Product $product
 * @property \Illuminate\Database\Eloquent\Collection $booked_options
 *
 * @package App\Models
 */
class Option extends Eloquent
{
	public $incrementing = false;

	protected $casts = [
		'option_id' => 'int',
		'prd_id' => 'int',
		'vendor_service_id' => 'int',
		'option_price' => 'float'
	];

	protected $fillable = [
		'option_name',
		'image_ids',
		'option_price',
		'created_by',
		'updated_by'
	];

	public function product()
	{
		return $this->belongsTo(\App\Models\Product::class, 'prd_id')
					->where('products.prd_id', '=', 'options.prd_id')
					->where('products.vendor_service_id', '=', 'options.vendor_service_id');
	}

	public function booked_options()
	{
		return $this->hasMany(\App\Models\BookedOption::class);
	}
}
