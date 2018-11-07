<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Fee
 * 
 * @property int $fee_id
 * @property string $fee_title
 * @property int $fee_amount
 * @property string $memo
 * @property int $vendor_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Vendor $vendor
 *
 * @package App\Models
 */
class Fee extends Eloquent
{
	protected $primaryKey = 'fee_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'fee_id' => 'int',
		'fee_amount' => 'int',
		'vendor_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'fee_title',
		'fee_amount',
		'memo',
		'vendor_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function vendor()
	{
		return $this->belongsTo(\App\Models\Vendor::class);
	}
}
