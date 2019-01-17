<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 04 Dec 2018 03:17:32 +0000.
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
 * @property  string cacheKey
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

    /**
     * @return string
     */
    public function cacheKey()
    {
        return sprintf(
            "%s/%s-%s",
            $this->getTable(),
            $this->getKey(),
            $this->updated_at->timestamp
        );
    }

}
