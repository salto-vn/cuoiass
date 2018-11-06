<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class BookedCustomizeField
 * 
 * @property int $booked_cus_field_id
 * @property int $booked_id
 * @property string $customize_field_answer
 * @property int $customize_field_id
 * @property int $pro_id
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Booking $booking
 * @property \App\Models\CustomizeField $customize_field
 *
 * @package App\Models
 */
class BookedCustomizeField extends Eloquent
{
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'booked_cus_field_id' => 'int',
		'booked_id' => 'int',
		'customize_field_id' => 'int',
		'pro_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'customize_field_answer',
		'customize_field_id',
		'pro_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function booking()
	{
		return $this->belongsTo(\App\Models\Booking::class, 'booked_id');
	}

	public function customize_field()
	{
		return $this->belongsTo(\App\Models\CustomizeField::class)
					->where('customize_fields.customize_field_id', '=', 'booked_customize_fields.customize_field_id')
					->where('customize_fields.prd_id', '=', 'booked_customize_fields.pro_id');
	}
}
