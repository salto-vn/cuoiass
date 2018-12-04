<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Credit
 * 
 * @property int $credit_id
 * @property \Carbon\Carbon $action_date
 * @property string $action_type
 * @property string $method
 * @property int $credit
 * @property float $money
 * @property string $invoice_url
 * @property int $vendor_id
 * @property int $prd_id
 * @property int $booked_id
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Booking $booking
 * @property \App\Models\Product $product
 * @property \App\Models\Vendor $vendor
 *
 * @package App\Models
 */
class Credit extends Eloquent
{
	protected $primaryKey = 'credit_id';

	protected $casts = [
		'credit' => 'int',
		'money' => 'float',
		'vendor_id' => 'int',
		'prd_id' => 'int',
		'booked_id' => 'int'
	];

	protected $dates = [
		'action_date'
	];

	protected $fillable = [
		'action_date',
		'action_type',
		'method',
		'credit',
		'money',
		'invoice_url',
		'vendor_id',
		'prd_id',
		'booked_id',
		'created_by',
		'updated_by'
	];

	public function booking()
	{
		return $this->belongsTo(\App\Models\Booking::class, 'booked_id');
	}

	public function product()
	{
		return $this->belongsTo(\App\Models\Product::class, 'prd_id');
	}

	public function vendor()
	{
		return $this->belongsTo(\App\Models\Vendor::class);
	}
}
