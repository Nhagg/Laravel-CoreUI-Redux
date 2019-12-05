<?php
namespace App\Entities\DataInsight;

use App\Entities\DataInsight\BaseModel;

class t_schema_marks extends BaseModel {


    /**
     * Table name
     */
    protected $table = "t_schema_marks";

    /**
     * Change name of Primary key
     */
    protected $primaryKey = "schema_code";
    public    $incrementing = false;

    /*
     * Columns
     */
    const CODE      = "code";
    const HIDDEN    = "hidden";

        /**
     * Hidden column
     */
    protected $hidden = [ 
        self::CREATED_AT, self::UPDATED_AT, self::HIDDEN
    ];

    public static function getHiddenList(){
        return t_schema_marks::where( self::HIDDEN, 1 )->get();
    }

}