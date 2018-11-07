<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 06:56:24 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Image
 * 
 * @property int $img_id
 * @property string $img_url
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class Image extends Eloquent
{
	protected $primaryKey = 'img_id';

	protected $fillable = [
		'img_url',
		'created_by',
		'updated_by'
	];
}
