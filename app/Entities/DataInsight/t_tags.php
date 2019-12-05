<?php
namespace App\Entities\DataInsight;

use App\Entities\DataInsight\BaseModel;

class t_tags extends BaseModel {


    /**
     * Table name
     */
    protected $table = "t_tags";

    /**
     * Change name of Primary key
     */
    protected $primaryKey = "tag";
    public    $incrementing = false;

    /*
     * Columns
     */
    const TAG               = "tag";
    const PARENT_ID         = "parent_id";
    const DESCRIPTION       = "description";
    const FORMAT_TYPE       = "format_type";
    const DELETED           = "deleted";

    /**
     * Hidden column
     */
    protected $hidden = [ 
        self::CREATED_AT, self::UPDATED_AT, self::DELETED
    ];


    public static function all( $pageSize = 200 ){
        return 
            t_tags::where( self::DELETED, 0 )->paginate( $pageSize );
    } 

    public static function count(){
        return
            t_tags::where( self::DELETED, 0 )->count();
    }

    public static function listTagName(){
        return t_tags::select( self::TAG )
                ->where( self::DELETED, 0 )
                ->get();
    }

}