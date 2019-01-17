<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class BookedDrink
 *
 * @property int booked_drink_id
 * @property string $booked_menu
 * @property string $service_code
 * @property int $booked_total
 * @property float $unit_price
 * @property int $booked_id
 * @property int $menu_id
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\Menu $menu
 * @property \App\Models\Booking $booking
 *
 * @package App\Models
 */
class BookedDrink extends Eloquent
{
	protected $primaryKey = 'booked_drink_id';

	protected $casts = [
		'booked_total' => 'int',
		'booked_id' => 'int',
		'menu_id' => 'int'
	];

	protected $fillable = [
		'booked_menu',
		'service_code',
		'booked_total',
		'booked_id',
		'menu_id',
		'created_by',
		'updated_by'
	];

	public function menu()
	{
		return $this->belongsTo(\App\Models\Menu::class);
	}

	public function booking()
	{
		return $this->belongsTo(\App\Models\Booking::class, 'booked_id');
	}
}
