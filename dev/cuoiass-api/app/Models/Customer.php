<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:41 +0000.
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
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
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
	public $timestamps = false;

	protected $casts = [
		'customer_id' => 'int',
		'member_flag' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'first_name',
		'last_name',
		'address',
		'phone',
		'fb',
		'member_flag',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
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
