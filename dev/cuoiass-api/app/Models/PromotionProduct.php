<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class PromotionProduct
 * 
 * @property int $promotion_product_id
 * @property int $promotion_id
 * @property int $prd_id
 * @property int $vendor_service_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Product $product
 * @property \App\Models\Promotion $promotion
 *
 * @package App\Models
 */
class PromotionProduct extends Eloquent
{
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'promotion_product_id' => 'int',
		'promotion_id' => 'int',
		'prd_id' => 'int',
		'vendor_service_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function product()
	{
		return $this->belongsTo(\App\Models\Product::class, 'prd_id')
					->where('products.prd_id', '=', 'promotion_products.prd_id')
					->where('products.vendor_service_id', '=', 'promotion_products.vendor_service_id');
	}

	public function promotion()
	{
		return $this->belongsTo(\App\Models\Promotion::class);
	}
}
