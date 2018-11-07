<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 06:56:23 +0000.
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
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
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

	protected $casts = [
		'role_id' => 'int',
		'staff_id' => 'int',
		'vendor_id' => 'int',
		'customer_id' => 'int'
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
		'created_by',
		'updated_by'
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
