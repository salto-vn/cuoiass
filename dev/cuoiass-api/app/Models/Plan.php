<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
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
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Customer $customer
 * @property \Illuminate\Database\Eloquent\Collection $bookings
 *
 * @package App\Models
 */
class Plan extends Eloquent
{
	protected $primaryKey = 'plan_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'total_price' => 'float',
		'customer_id' => 'int'
	];

	protected $dates = [
		'plan_date',
		'org_date',
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'plan_date',
		'org_date',
		'gr_name',
		'br_name',
		'org_address',
		'phone',
		'total_price',
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

	public function bookings()
	{
		return $this->hasMany(\App\Models\Booking::class);
	}
}
