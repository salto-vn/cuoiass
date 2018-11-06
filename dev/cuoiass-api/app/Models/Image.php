<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Image
 * 
 * @property int $img_id
 * @property string $img_url
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 *
 * @package App\Models
 */
class Image extends Eloquent
{
	protected $primaryKey = 'img_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'img_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'img_url',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];
}
