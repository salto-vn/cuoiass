<?php
namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
class Model extends Eloquent
{
    protected $fillable;

    /**
     * @return array
     */
    public function getColumns()
    {
        return $this->fillable;
    }
}
