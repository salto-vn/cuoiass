<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Honeymooninfo
 * 
 * @property int $honey_id
 * @property string $honey_tile
 * @property string $hotel_name
 * @property string $hotel_address
 * @property string $flight_no
 * @property string $airline_brand
 * @property \Carbon\Carbon $departure_date
 * @property \Carbon\Carbon $arrial_date
 * @property \Carbon\Carbon $booked_date
 * @property string $status
 * @property string $memo
 * @property int $booked_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Booking $booking
 *
 * @package App\Models
 */
class Honeymooninfo extends Eloquent
{
	protected $primaryKey = 'honey_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'honey_id' => 'int',
		'booked_id' => 'int'
	];

	protected $dates = [
		'departure_date',
		'arrial_date',
		'booked_date',
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'honey_tile',
		'hotel_name',
		'hotel_address',
		'flight_no',
		'airline_brand',
		'departure_date',
		'arrial_date',
		'booked_date',
		'status',
		'memo',
		'booked_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function booking()
	{
		return $this->belongsTo(\App\Models\Booking::class, 'booked_id');
	}
}
