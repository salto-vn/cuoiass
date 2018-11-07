<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 06:56:23 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Admin
 * 
 * @property int $id
 * @property string $email
 * @property string $password
 * @property string $name
 * @property int $role_id
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Role $role
 *
 * @package App\Models
 */
class Admin extends Eloquent
{
	protected $casts = [
		'role_id' => 'int'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'email',
		'password',
		'name',
		'role_id',
		'created_by',
		'updated_by'
	];

	public function role()
	{
		return $this->belongsTo(\App\Models\Role::class);
	}
}
