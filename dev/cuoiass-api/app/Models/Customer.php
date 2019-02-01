<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Customer
 *
 * @property int $customer_id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property string $address
 * @property string $phone
 * @property string $fb
 * @property int $member_flag
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $analysis
 * @property \Illuminate\Database\Eloquent\Collection $plans
 * @property \Illuminate\Database\Eloquent\Collection $reviews
 *
 * @package App\Models
 */
class Customer extends Model
{
	protected $primaryKey = 'customer_id';

	protected $casts = [
		'member_flag' => 'int'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
	    'customer_id',
		'first_name',
		'last_name',
		'email',
		'password',
		'address',
		'phone',
		'fb',
		'member_flag',
		'created_by',
		'updated_by'
	];

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
