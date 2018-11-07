<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 07 Nov 2018 04:42:06 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class TravelProduct
 * 
 * @property int $honey_id
 * @property string $honey_tile
 * @property string $honey_api_provider
 * @property string $honey_api_client
 * @property string $honey_api_key
 * @property string $honey_api_acc
 * @property string $created_by
 * @property \Carbon\Carbon $created_at
 * @property string $updated_by
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class TravelProduct extends Eloquent
{
	protected $primaryKey = 'honey_id';
	public $incrementing = false;

	protected $casts = [
		'honey_id' => 'int'
	];

	protected $fillable = [
		'honey_tile',
		'honey_api_provider',
		'honey_api_client',
		'honey_api_key',
		'honey_api_acc',
		'created_by',
		'updated_by'
	];
}
