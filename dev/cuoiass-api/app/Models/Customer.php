<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 04:42:06 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Customer
 * 
 * @property int $customer_id
 * @property string $first_name
 * @property string $last_name
 * @property string $address
 * @property string $phone
 * @property string $fb
 * @property int $member_flag
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $accounts
 * @property \Illuminate\Database\Eloquent\Collection $analysis
 * @property \Illuminate\Database\Eloquent\Collection $plans
 * @property \Illuminate\Database\Eloquent\Collection $reviews
 *
 * @package App\Models
 */
class Customer extends Eloquent
{
	protected $primaryKey = 'customer_id';
	public $incrementing = false;

	protected $casts = [
		'customer_id' => 'int',
		'member_flag' => 'int'
	];

	protected $fillable = [
		'first_name',
		'last_name',
		'address',
		'phone',
		'fb',
		'member_flag',
		'created_by',
		'updated_by'
	];

	public function accounts()
	{
		return $this->hasMany(\App\Models\Account::class);
	}

	public function analysis()
	{
		return $this->hasMany(\App\Models\Analysi::class);
	}

	public function plans()
	{
		return $this->hasMany(\App\Models\Plan::class);
	}

	public function reviews()
	{
		return $this->hasMany(\App\Models\Review::class);
	}
}
