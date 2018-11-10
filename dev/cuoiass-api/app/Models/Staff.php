<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 07:39:35 +0000.
 */

namespace App\Models;

use App\Utils\TableName;
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
    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'staff_id';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = TableName::TBL_STAFFS;

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
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'created_by',
        'created_at',
        'updated_by',
        'updated_at'
    ];

    /**
     * Allow fields search
     *
     * @return array
     */
    public function fieldsSearchable()
    {
        return ['staff_name', 'phone', 'address', 'email', 'role_name', 'role_code', 'system_code'];
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
