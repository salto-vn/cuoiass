<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:43 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Vendor
 * 
 * @property int $vendor_id
 * @property string $vendor_name
 * @property string $company
 * @property string $address
 * @property string $city
 * @property string $web_url
 * @property string $president_name
 * @property string $phone
 * @property int $credit_balance
 * @property string $fax
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $credits
 * @property \Illuminate\Database\Eloquent\Collection $fees
 * @property \Illuminate\Database\Eloquent\Collection $staff
 * @property \Illuminate\Database\Eloquent\Collection $vendor_services
 *
 * @package App\Models
 */
class Vendor extends Eloquent
{
	protected $primaryKey = 'vendor_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'vendor_id' => 'int',
		'credit_balance' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'vendor_name',
		'company',
		'address',
		'city',
		'web_url',
		'president_name',
		'phone',
		'credit_balance',
		'fax',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function credits()
	{
		return $this->hasMany(\App\Models\Credit::class);
	}

	public function fees()
	{
		return $this->hasMany(\App\Models\Fee::class);
	}

	public function staff()
	{
		return $this->hasMany(\App\Models\Staff::class);
	}

	public function vendor_services()
	{
		return $this->hasMany(\App\Models\VendorService::class);
	}
}
