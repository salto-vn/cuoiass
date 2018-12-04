<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class BookedHoneyMoon
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
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Booking $booking
 *
 * @package App\Models
 */
class BookedHoneyMoon extends Eloquent
{
	protected $primaryKey = 'honey_id';

	protected $casts = [
		'booked_id' => 'int'
	];

	protected $dates = [
		'departure_date',
		'arrial_date',
		'booked_date'
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
		'created_by',
		'updated_by'
	];

	public function booking()
	{
		return $this->belongsTo(\App\Models\Booking::class, 'booked_id');
	}
}
