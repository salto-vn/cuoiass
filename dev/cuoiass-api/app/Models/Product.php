<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Product
 *
 * @property int $prd_id
 * @property string $prd_cd
 * @property string $prd_name
 * @property string $prd_desc
 * @property float $price
 * @property int $publish_flag
 * @property \Carbon\Carbon $publish_date
 * @property string $prd_colors
 * @property string $prd_sizes
 * @property string $prd_materials
 * @property string $prd_style
 * @property int $prd_page
 * @property string $prd_party_photo_size
 * @property string $prd_times
 * @property string $prd_images
 * @property int $vendor_service_id
 * @property string $service_code
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\MasterService $master_service
 * @property \App\Models\VendorService $vendor_service
 * @property \Illuminate\Database\Eloquent\Collection $bookings
 * @property \Illuminate\Database\Eloquent\Collection $credits
 * @property \Illuminate\Database\Eloquent\Collection $customize_fields
 * @property \Illuminate\Database\Eloquent\Collection $menus
 * @property \Illuminate\Database\Eloquent\Collection $options
 * @property \Illuminate\Database\Eloquent\Collection $packages
 * @property \Illuminate\Database\Eloquent\Collection $promotions
 * @property \Illuminate\Database\Eloquent\Collection $reviews
 * @property \Illuminate\Database\Eloquent\Collection $schedule_photos
 *
 * @package App\Models
 */
class Product extends Model
{
	protected $casts = [
		'price' => 'float',
		'publish_flag' => 'int',
		'prd_page' => 'int',
		'vendor_service_id' => 'int'
	];

	protected $dates = [
		'publish_date'
	];

    protected $primaryKey = 'prd_id';

	protected $fillable = [
        'prd_id',
        'vendor_service_id',
		'prd_cd',
		'prd_name',
		'prd_desc',
		'price',
		'publish_flag',
		'publish_date',
		'prd_colors',
		'prd_sizes',
		'prd_materials',
		'prd_style',
		'prd_page',
		'prd_party_photo_size',
		'prd_times',
		'prd_images',
		'service_code',
		'created_by',
		'updated_by'
	];

	public function master_service()
	{
		return $this->belongsTo(\App\Models\MasterService::class, 'service_code');
	}

	public function vendor_service()
	{
		return $this->belongsTo(\App\Models\VendorService::class,'vendor_service_id');
	}

	public function bookings()
	{
		return $this->hasMany(\App\Models\Booking::class, 'prd_id');
	}

	public function credits()
	{
		return $this->hasMany(\App\Models\Credit::class, 'prd_id');
	}

	public function customize_fields()
	{
		return $this->hasMany(\App\Models\CustomizeField::class, 'prd_id');
	}

	public function menus()
	{
		return $this->hasMany(\App\Models\Menu::class, 'prd_id');
	}

	public function options()
	{
		return $this->hasMany(\App\Models\Option::class, 'prd_id');
	}

	public function packages()
	{
		return $this->belongsToMany(\App\Models\Package::class, 'package_products', 'prd_id')
					->withPivot('id', 'created_by', 'updated_by')
					->withTimestamps();
	}

	public function promotions()
	{
		return $this->belongsToMany(\App\Models\Promotion::class, 'promotion_products', 'prd_id')
					->withPivot('promotion_product_id', 'vendor_service_id', 'created_by', 'updated_by')
					->withTimestamps();
	}

	public function reviews()
	{
		return $this->hasMany(\App\Models\Review::class, 'prd_id');
	}

	public function schedule_photos()
	{
		return $this->hasMany(\App\Models\SchedulePhoto::class, 'prd_id');
	}

}
