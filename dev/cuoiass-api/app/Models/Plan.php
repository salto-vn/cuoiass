<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Plan
 *
 * @property string $plan_id
 * @property \Carbon\Carbon $plan_date
 * @property \Carbon\Carbon $org_date
 * @property string $gr_name
 * @property string $br_name
 * @property string $org_address
 * @property string $phone
 * @property float $total_price
 * @property int $customer_id
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\Customer $customer
 * @property \Illuminate\Database\Eloquent\Collection $bookings
 *
 * @package App\Models
 */
class Plan extends Model
{
	protected $primaryKey = 'plan_id';
	public $incrementing = false;

	protected $casts = [
		'total_price' => 'float',
		'customer_id' => 'int'
	];

	protected $dates = [
		'plan_date',
		'org_date'
	];

	protected $fillable = [
	    'plan_id',
		'plan_date',
		'org_date',
		'gr_name',
		'br_name',
		'org_address',
		'phone',
		'total_price',
		'customer_id',
		'created_by',
		'updated_by'
	];

	public function customer()
	{
		return $this->belongsTo(\App\Models\Customer::class);
	}

	public function bookings()
	{
		return $this->hasMany(\App\Models\Booking::class);
	}
}
