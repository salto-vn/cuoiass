<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class MasterService
 * 
 * @property string $service_code
 * @property string $service_name
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
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
	public $timestamps = false;

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'service_name',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
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
