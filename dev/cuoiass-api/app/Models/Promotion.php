<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 06:56:24 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Promotion
 * 
 * @property int $promotion_id
 * @property string $promotion_title
 * @property string $promotion_code
 * @property \Carbon\Carbon $start_date
 * @property \Carbon\Carbon $end_date
 * @property string $promotion_type
 * @property int $promotion_amount
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $products
 *
 * @package App\Models
 */
class Promotion extends Eloquent
{
	protected $primaryKey = 'promotion_id';

	protected $casts = [
		'promotion_amount' => 'int'
	];

	protected $dates = [
		'start_date',
		'end_date'
	];

	protected $fillable = [
		'promotion_title',
		'promotion_code',
		'start_date',
		'end_date',
		'promotion_type',
		'promotion_amount',
		'created_by',
		'updated_by'
	];

	public function products()
	{
		return $this->belongsToMany(\App\Models\Product::class, 'promotion_products', 'promotion_id', 'prd_id')
					->withPivot('promotion_product_id', 'vendor_service_id', 'created_by', 'updated_by')
					->withTimestamps();
	}
}
