<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Review
 * 
 * @property int $review_id
 * @property string $review_content
 * @property \Carbon\Carbon $review_date
 * @property float $review_rate
 * @property string $review_imgs
 * @property int $prd_id
 * @property int $booked_id
 * @property int $customer_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Customer $customer
 * @property \App\Models\Booking $booking
 * @property \App\Models\Product $product
 *
 * @package App\Models
 */
class Review extends Eloquent
{
	protected $primaryKey = 'review_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'review_id' => 'int',
		'review_rate' => 'float',
		'prd_id' => 'int',
		'booked_id' => 'int',
		'customer_id' => 'int'
	];

	protected $dates = [
		'review_date',
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'review_content',
		'review_date',
		'review_rate',
		'review_imgs',
		'prd_id',
		'booked_id',
		'customer_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function customer()
	{
		return $this->belongsTo(\App\Models\Customer::class);
	}

	public function booking()
	{
		return $this->belongsTo(\App\Models\Booking::class, 'booked_id');
	}

	public function product()
	{
		return $this->belongsTo(\App\Models\Product::class, 'prd_id');
	}
}
