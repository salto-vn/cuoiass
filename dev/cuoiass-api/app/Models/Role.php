<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
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
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $accounts
 * @property \Illuminate\Database\Eloquent\Collection $admins
 *
 * @package App\Models
 */
class Role extends Eloquent
{
	protected $primaryKey = 'role_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'role_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'role_name',
		'role_code',
		'system_code',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
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
