<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class BookedOption
 * 
 * @property int $booked_opt_id
 * @property int $booked_id
 * @property string $option_name
 * @property int $option_quality
 * @property float $option_price
 * @property int $option_id
 * @property int $prd_id
 * @property int $vendor_service_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Option $option
 * @property \App\Models\Booking $booking
 *
 * @package App\Models
 */
class BookedOption extends Eloquent
{
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'booked_opt_id' => 'int',
		'booked_id' => 'int',
		'option_quality' => 'int',
		'option_price' => 'float',
		'option_id' => 'int',
		'prd_id' => 'int',
		'vendor_service_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'option_name',
		'option_quality',
		'option_price',
		'option_id',
		'prd_id',
		'vendor_service_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function option()
	{
		return $this->belongsTo(\App\Models\Option::class)
					->where('options.option_id', '=', 'booked_options.option_id')
					->where('options.prd_id', '=', 'booked_options.prd_id')
					->where('options.vendor_service_id', '=', 'booked_options.vendor_service_id');
	}

	public function booking()
	{
		return $this->belongsTo(\App\Models\Booking::class, 'booked_id');
	}
}
