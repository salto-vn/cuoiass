<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
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
 * @property \Illuminate\Database\Eloquent\Collection $admins
 * @property \Illuminate\Database\Eloquent\Collection $staff
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

	public function admins()
	{
		return $this->hasMany(\App\Models\Admin::class);
	}

	public function staff()
	{
		return $this->hasMany(\App\Models\Staff::class);
	}
}
