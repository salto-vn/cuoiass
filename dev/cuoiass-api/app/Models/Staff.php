<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Staff
 *
 * @property int $staff_id
 * @property int $vendor_id
 * @property string $staff_name
 * @property string $email
 * @property string $password
 * @property string $phone
 * @property string $address
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * @property int $role_id
 *
 * @property \App\Models\Role $role
 * @property \App\Models\Vendor $vendor
 *
 * @package App\Models
 */
class Staff extends Eloquent
{

	protected $table = 'staffs';

    protected $primaryKey = 'staff_id';

	protected $casts = [
		'vendor_id' => 'int',
		'role_id' => 'int',
        'created_at' => 'date:d-m-Y H:m:i',
        'updated_at' => 'date:d-m-Y H:m:i'
	];

	protected $hidden = [
		'password',
	];

	protected $fillable = [
        'vendor_id',
        'role_id',
		'staff_name',
		'email',
		'password',
		'phone',
		'address',
		'created_by',
		'updated_by'
	];

    /**
     * Allow fields search
     *
     * @return array
     */
    public function fieldsSearchable()
    {
        return ['staff_name', 'phone', 'address', 'email', 'role_id', 'system_code'];
    }

	public function role()
	{
		return $this->belongsTo(\App\Models\Role::class,'role_id');
	}

	public function vendor()
	{
		return $this->belongsTo(\App\Models\Vendor::class);
	}

}
