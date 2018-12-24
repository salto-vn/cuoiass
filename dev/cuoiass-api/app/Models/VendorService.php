<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class VendorService
 *
 * @property int $vendor_service_id
 * @property int $vendor_id
 * @property string $service_code
 * @property string $ven_serv_name
 * @property string $add_service
 * @property string $city
 * @property string $phone_service
 * @property string $fax_service
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\MasterService $master_service
 * @property \App\Models\Vendor $vendor
 * @property \Illuminate\Database\Eloquent\Collection $products
 *
 * @package App\Models
 */
class VendorService extends Model
{
	protected $primaryKey = 'vendor_service_id';

	protected $casts = [
		'vendor_id' => 'int'
	];

	protected $fillable = [
		'vendor_id',
		'service_code',
		'ven_serv_name',
		'add_service',
		'city',
		'phone_service',
		'fax_service',
		'created_by',
		'updated_by'
	];

	public function master_service()
	{
		return $this->belongsTo(\App\Models\MasterService::class, 'service_code');
	}

	public function vendor()
	{
		return $this->belongsTo(\App\Models\Vendor::class);
	}

	public function products()
	{
		return $this->hasMany(\App\Models\Product::class);
	}
}
