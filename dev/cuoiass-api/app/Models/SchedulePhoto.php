<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
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
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 * 
 * @property \App\Models\Product $product
 *
 * @package App\Models
 */
class SchedulePhoto extends Eloquent
{
	protected $primaryKey = 'sche_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'sche_id' => 'int',
		'prd_id' => 'int'
	];

	protected $dates = [
		'sche_start_time',
		'sche_end_time',
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'sche_start_time',
		'sche_end_time',
		'sche_title',
		'sche_desc',
		'image_ids',
		'prd_id',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];

	public function product()
	{
		return $this->belongsTo(\App\Models\Product::class, 'prd_id');
	}
}
