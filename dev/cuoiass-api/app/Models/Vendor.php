<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
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
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
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

	protected $casts = [
		'credit_balance' => 'int'
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
		'created_by',
		'updated_by'
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
