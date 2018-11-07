<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 07:39:35 +0000.
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
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Product $product
 * @property \App\Models\Promotion $promotion
 *
 * @package App\Models
 */
class PromotionProduct extends Eloquent
{
	protected $casts = [
		'promotion_id' => 'int',
		'prd_id' => 'int',
		'vendor_service_id' => 'int'
	];

	protected $fillable = [
		'created_by',
		'updated_by'
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
