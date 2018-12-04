<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
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
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Booking $booking
 * @property \App\Models\CustomizeField $customize_field
 *
 * @package App\Models
 */
class BookedCustomizeField extends Eloquent
{
	protected $casts = [
		'booked_id' => 'int',
		'customize_field_id' => 'int',
		'pro_id' => 'int'
	];

	protected $fillable = [
		'customize_field_answer',
		'customize_field_id',
		'pro_id',
		'created_by',
		'updated_by'
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
