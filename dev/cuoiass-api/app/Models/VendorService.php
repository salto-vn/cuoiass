<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:43 +0000.
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
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\MasterService $master_service
 * @property \App\Models\Vendor $vendor
 * @property \Illuminate\Database\Eloquent\Collection $products
 *
 * @package App\Models
 */
class VendorService extends Eloquent
{
	protected $primaryKey = 'vendor_service_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'vendor_service_id' => 'int',
		'vendor_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'vendor_id',
		'service_code',
		'ven_serv_name',
		'add_service',
		'city',
		'phone_service',
		'fax_service',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
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
