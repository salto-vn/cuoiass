<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class BookedFood
 * 
 * @property int $booked_food_id
 * @property string $booked_menu
 * @property string $service_code
 * @property int $booked_total
 * @property float $unit_price
 * @property string $booked_drink
 * @property float $drink_unit_price
 * @property int $booked_id
 * @property int $menu_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Menu $menu
 * @property \App\Models\Booking $booking
 *
 * @package App\Models
 */
class BookedFood extends Eloquent
{
	protected $primaryKey = 'booked_food_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'booked_food_id' => 'int',
		'booked_total' => 'int',
		'unit_price' => 'float',
		'drink_unit_price' => 'float',
		'booked_id' => 'int',
		'menu_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'booked_menu',
		'service_code',
		'booked_total',
		'unit_price',
		'booked_drink',
		'drink_unit_price',
		'booked_id',
		'menu_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
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
