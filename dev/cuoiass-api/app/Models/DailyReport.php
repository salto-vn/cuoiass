<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 06 Nov 2018 15:54:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class DailyReport
 * 
 * @property \Carbon\Carbon $report_date
 * @property string $report_type
 * @property int $report_id
 * @property int $total_view
 * @property int $total_booking
 * @property int $total_booking_finshed
 * @property int $total_booking_cancelled
 * @property float $total_price
 * @property float $total_price_canceled
 * @property string $create_by
 * @property \Carbon\Carbon $create_at
 * @property string $update_by
 * @property \Carbon\Carbon $update_at
 *
 * @package App\Models
 */
class DailyReport extends Eloquent
{
	protected $primaryKey = 'report_date';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'report_id' => 'int',
		'total_view' => 'int',
		'total_booking' => 'int',
		'total_booking_finshed' => 'int',
		'total_booking_cancelled' => 'int',
		'total_price' => 'float',
		'total_price_canceled' => 'float'
	];

	protected $dates = [
		'report_date',
		'create_at',
		'update_at'
	];

	protected $fillable = [
		'report_type',
		'report_id',
		'total_view',
		'total_booking',
		'total_booking_finshed',
		'total_booking_cancelled',
		'total_price',
		'total_price_canceled',
		'create_by',
		'create_at',
		'update_by',
		'update_at'
	];
}
