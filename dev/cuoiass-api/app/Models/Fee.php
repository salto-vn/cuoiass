<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 06:56:23 +0000.
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
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Vendor $vendor
 *
 * @package App\Models
 */
class Fee extends Eloquent
{
	protected $primaryKey = 'fee_id';

	protected $casts = [
		'fee_amount' => 'int',
		'vendor_id' => 'int'
	];

	protected $fillable = [
		'fee_title',
		'fee_amount',
		'memo',
		'vendor_id',
		'created_by',
		'updated_by'
	];

	public function vendor()
	{
		return $this->belongsTo(\App\Models\Vendor::class);
	}
}
