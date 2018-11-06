<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Account
 * 
 * @property int $account_id
 * @property int $role_id
 * @property string $email
 * @property string $password
 * @property int $staff_id
 * @property int $vendor_id
 * @property int $customer_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Customer $customer
 * @property \App\Models\Staff $staff
 * @property \App\Models\Role $role
 *
 * @package App\Models
 */
class Account extends Eloquent
{
	protected $primaryKey = 'account_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'account_id' => 'int',
		'role_id' => 'int',
		'staff_id' => 'int',
		'vendor_id' => 'int',
		'customer_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'role_id',
		'email',
		'password',
		'staff_id',
		'vendor_id',
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

	public function staff()
	{
		return $this->belongsTo(\App\Models\Staff::class)
					->where('staffs.staff_id', '=', 'accounts.staff_id')
					->where('staffs.vendor_id', '=', 'accounts.vendor_id');
	}

	public function role()
	{
		return $this->belongsTo(\App\Models\Role::class);
	}
}
