<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
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
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Vendor $vendor
 * @property \Illuminate\Database\Eloquent\Collection $accounts
 *
 * @package App\Models
 */
class Staff extends Eloquent
{
	protected $table = 'staffs';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'staff_id' => 'int',
		'vendor_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'staff_name',
		'phone',
		'address',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
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
