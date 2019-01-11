<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class CustomizeField
 *
 * @property int $customize_field_id
 * @property int $prd_id
 * @property int $vendor_service_id
 * @property string $customize_field_name
 * @property string $customize_field_type
 * @property string $customize_field_value
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\Product $product
 * @property \Illuminate\Database\Eloquent\Collection $booked_customize_fields
 *
 * @package App\Models
 */
class CustomizeField extends Eloquent
{
	protected $casts = [
		'prd_id' => 'int',
		'vendor_service_id' => 'int'
	];

	protected $fillable = [
		'customize_field_name',
		'customize_field_type',
        'customize_field_key',
		'customize_field_value',
		'created_by',
		'updated_by'
	];

	public function product()
	{
		return $this->belongsTo(\App\Models\Product::class, 'prd_id')
					->where('products.prd_id', '=', 'customize_fields.prd_id')
					->where('products.vendor_service_id', '=', 'customize_fields.vendor_service_id');
	}

	public function booked_customize_fields()
	{
		return $this->hasMany(\App\Models\BookedCustomizeField::class);
	}
}
