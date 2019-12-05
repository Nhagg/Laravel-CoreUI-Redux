<?php
namespace App\Entities\DataInsight;

use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model {

    /**
     * Default connection
     */
    protected $connection = 'db_data_insight';

    const CREATED_AT    = "created_at";
    const UPDATED_AT    = "updated_at";

    /**
     * Hidden column
     */
    protected $hidden = [ 
        self::CREATED_AT, self::UPDATED_AT
    ];

    /**
     * Date columns
     */
    protected $dates = [
        'DATE',
        self::CREATED_AT,
        self::UPDATED_AT
    ];

    public static function table()
    {
        return with(new static)->getTable();
    }

    public function get( $name ){
        return $this->$name;
    }
}