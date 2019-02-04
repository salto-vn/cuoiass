<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

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
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\Option $option
 * @property \App\Models\Booking $booking
 *
 * @package App\Models
 */
class BookedOption extends Model
{
    use SoftDeletes;

    public static function boot()
    {
        parent::boot();
    }

    protected $casts = [
		'booked_id' => 'int',
		'option_quality' => 'int',
		'option_price' => 'float',
		'option_id' => 'int',
		'prd_id' => 'int',
		'vendor_service_id' => 'int'
	];
    protected $dates = ['deleted_at'];
	protected $fillable = [
		'option_name',
		'option_quality',
		'option_price',
		'option_id',
		'prd_id',
		'vendor_service_id',
		'created_by',
		'updated_by'
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
