<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class SchedulePhoto
 * 
 * @property int $sche_id
 * @property \Carbon\Carbon $sche_start_time
 * @property \Carbon\Carbon $sche_end_time
 * @property string $sche_title
 * @property string $sche_desc
 * @property string $image_ids
 * @property int $prd_id
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Product $product
 *
 * @package App\Models
 */
class SchedulePhoto extends Eloquent
{
	protected $primaryKey = 'sche_id';

	protected $casts = [
		'prd_id' => 'int'
	];

	protected $dates = [
		'sche_start_time',
		'sche_end_time'
	];

	protected $fillable = [
		'sche_start_time',
		'sche_end_time',
		'sche_title',
		'sche_desc',
		'image_ids',
		'prd_id',
		'created_by',
		'updated_by'
	];

	public function product()
	{
		return $this->belongsTo(\App\Models\Product::class, 'prd_id');
	}
}
