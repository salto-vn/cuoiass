<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 06:56:24 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Role
 * 
 * @property int $role_id
 * @property string $role_name
 * @property string $role_code
 * @property string $system_code
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $accounts
 * @property \Illuminate\Database\Eloquent\Collection $admins
 *
 * @package App\Models
 */
class Role extends Eloquent
{
	protected $primaryKey = 'role_id';

	protected $fillable = [
		'role_name',
		'role_code',
		'system_code',
		'created_by',
		'updated_by'
	];

	public function accounts()
	{
		return $this->hasMany(\App\Models\Account::class);
	}

	public function admins()
	{
		return $this->hasMany(\App\Models\Admin::class);
	}
}
