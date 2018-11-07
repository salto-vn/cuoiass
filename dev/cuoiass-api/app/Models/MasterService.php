<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 04:42:06 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class MasterService
 * 
 * @property string $service_code
 * @property string $service_name
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $products
 * @property \Illuminate\Database\Eloquent\Collection $vendor_services
 *
 * @package App\Models
 */
class MasterService extends Eloquent
{
	protected $primaryKey = 'service_code';
	public $incrementing = false;

	protected $fillable = [
		'service_name',
		'created_by',
		'updated_by'
	];

	public function products()
	{
		return $this->hasMany(\App\Models\Product::class, 'service_code');
	}

	public function vendor_services()
	{
		return $this->hasMany(\App\Models\VendorService::class, 'service_code');
	}
}
