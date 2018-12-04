<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Booking
 *
 * @property int $booked_id
 * @property string $booked_cd
 * @property string $booked_pro_name
 * @property int $booked_size
 * @property string $booked_color
 * @property string $booked_material
 * @property string $booked_style
 * @property int $booked_album_page
 * @property string $booked_photo_size
 * @property int $booked_size_2
 * @property string $booked_color_2
 * @property \Carbon\Carbon $booked_time
 * @property \Carbon\Carbon $try_date
 * @property \Carbon\Carbon $activate_date
 * @property string $status
 * @property string $memo
 * @property \Carbon\Carbon $booked_date
 * @property string $payment_name
 * @property string $payment_phone
 * @property string $payment_email
 * @property float $net_price
 * @property float $gross_price
 * @property string $invoice_url
 * @property string $plan_id
 * @property int $prd_id
 * @property int $vendor_service_id
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\Product $product
 * @property \App\Models\Plan $plan
 * @property \Illuminate\Database\Eloquent\Collection $booked_customize_fields
 * @property \Illuminate\Database\Eloquent\Collection $booked_foods
 * @property \Illuminate\Database\Eloquent\Collection $booked_honey_moons
 * @property \Illuminate\Database\Eloquent\Collection $booked_options
 * @property \Illuminate\Database\Eloquent\Collection $credits
 * @property \Illuminate\Database\Eloquent\Collection $reviews
 *
 * @package App\Models
 */
class Booking extends Eloquent
{
	protected $primaryKey = 'booked_id';

	protected $casts = [
		'booked_size' => 'int',
		'booked_album_page' => 'int',
		'booked_size_2' => 'int',
		'net_price' => 'float',
		'gross_price' => 'float',
		'prd_id' => 'int',
		'vendor_service_id' => 'int',
        'try_date' => 'date:d-m-Y H:m:i',
        'activate_date' => 'date:d-m-Y',
        'booked_date' => 'date:d-m-Y'
	];

	protected $dates = [
		'booked_time',
		'try_date',
		'activate_date',
		'booked_date'
	];

	protected $fillable = [
		'booked_cd',
		'booked_pro_name',
		'booked_size',
		'booked_color',
		'booked_material',
		'booked_style',
		'booked_album_page',
		'booked_photo_size',
		'booked_size_2',
		'booked_color_2',
		'booked_time',
		'try_date',
		'activate_date',
		'status',
		'memo',
		'booked_date',
		'payment_name',
		'payment_phone',
		'payment_email',
		'net_price',
		'gross_price',
		'invoice_url',
		'plan_id',
		'prd_id',
		'vendor_service_id',
		'created_by',
		'updated_by'
	];

	public function product()
	{
		return $this->belongsTo(\App\Models\Product::class, 'prd_id')
					->where('products.prd_id', '=', 'bookings.prd_id')
					->where('products.vendor_service_id', '=', 'bookings.vendor_service_id');
	}

	public function plan()
	{
		return $this->belongsTo(\App\Models\Plan::class);
	}

	public function booked_customize_fields()
	{
		return $this->hasMany(\App\Models\BookedCustomizeField::class, 'booked_id');
	}

	public function booked_foods()
	{
		return $this->hasMany(\App\Models\BookedFood::class, 'booked_id');
	}

	public function booked_honey_moons()
	{
		return $this->hasMany(\App\Models\BookedHoneyMoon::class, 'booked_id');
	}

	public function booked_options()
	{
		return $this->hasMany(\App\Models\BookedOption::class, 'booked_id');
	}

	public function credits()
	{
		return $this->hasMany(\App\Models\Credit::class, 'booked_id');
	}

	public function reviews()
	{
		return $this->hasMany(\App\Models\Review::class, 'booked_id');
	}
}
