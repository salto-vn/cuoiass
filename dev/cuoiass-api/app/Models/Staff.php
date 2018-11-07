<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 06:56:24 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Staff
 * 
 * @property int $staff_id
 * @property int $vendor_id
 * @property string $staff_name
 * @property string $phone
 * @property string $address
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Vendor $vendor
 * @property \Illuminate\Database\Eloquent\Collection $accounts
 *
 * @package App\Models
 */
class Staff extends Eloquent
{
	protected $table = 'staffs';

	protected $casts = [
		'vendor_id' => 'int'
	];

	protected $fillable = [
		'staff_name',
		'phone',
		'address',
		'created_by',
		'updated_by'
	];

	public function vendor()
	{
		return $this->belongsTo(\App\Models\Vendor::class);
	}

	public function accounts()
	{
		return $this->hasMany(\App\Models\Account::class);
	}
}
