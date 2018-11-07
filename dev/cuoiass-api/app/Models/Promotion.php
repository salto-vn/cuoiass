<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
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
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $products
 *
 * @package App\Models
 */
class Promotion extends Eloquent
{
	protected $primaryKey = 'promotion_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'promotion_id' => 'int',
		'promotion_amount' => 'int'
	];

	protected $dates = [
		'start_date',
		'end_date',
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'promotion_title',
		'promotion_code',
		'start_date',
		'end_date',
		'promotion_type',
		'promotion_amount',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function products()
	{
		return $this->belongsToMany(\App\Models\Product::class, 'promotion_products', 'promotion_id', 'prd_id')
					->withPivot('promotion_product_id', 'vendor_service_id', 'create_by', 'create_at', 'update_by', 'update_at');
	}
}
