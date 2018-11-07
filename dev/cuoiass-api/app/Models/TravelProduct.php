<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
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
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 *
 * @package App\Models
 */
class TravelProduct extends Eloquent
{
	protected $primaryKey = 'honey_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'honey_id' => 'int'
	];

	protected $dates = [
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'honey_tile',
		'honey_api_provider',
		'honey_api_client',
		'honey_api_key',
		'honey_api_acc',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];
}
