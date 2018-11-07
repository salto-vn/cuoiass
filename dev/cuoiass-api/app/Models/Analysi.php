<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 06:56:23 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Analysi
 * 
 * @property int $id
 * @property \Carbon\Carbon $date
 * @property string $screen_url
 * @property string $action
 * @property string $user_ip
 * @property string $user_facebook
 * @property int $customer_id
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Customer $customer
 *
 * @package App\Models
 */
class Analysi extends Eloquent
{
	protected $casts = [
		'customer_id' => 'int'
	];

	protected $dates = [
		'date'
	];

	protected $fillable = [
		'date',
		'screen_url',
		'action',
		'user_ip',
		'user_facebook',
		'customer_id',
		'created_by',
		'updated_by'
	];

	public function customer()
	{
		return $this->belongsTo(\App\Models\Customer::class);
	}
}
