<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:41 +0000.
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
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Customer $customer
 *
 * @package App\Models
 */
class Analysi extends Eloquent
{
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'customer_id' => 'int'
	];

	protected $dates = [
		'date',
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'date',
		'screen_url',
		'action',
		'user_ip',
		'user_facebook',
		'customer_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function customer()
	{
		return $this->belongsTo(\App\Models\Customer::class);
	}
}
