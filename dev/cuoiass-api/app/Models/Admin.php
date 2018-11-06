<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Admin
 * 
 * @property int $id
 * @property string $email
 * @property string $password
 * @property int $role_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Role $role
 *
 * @package App\Models
 */
class Admin extends Eloquent
{
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'role_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'email',
		'password',
		'role_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function role()
	{
		return $this->belongsTo(\App\Models\Role::class);
	}
}
