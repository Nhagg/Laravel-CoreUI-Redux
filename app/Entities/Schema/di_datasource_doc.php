<?php
namespace App\Entities\Schema;

use App\Entities\Schema\BaseModel;

class di_datasource_doc extends BaseModel {
    /**
     * Collenction name
     */
    protected $collection = 'di-datasource-doc';

    /**
     * Mandodary field
     */
    const CODE    = 'code';
    const NAME    = 'name';
    const ENABLED = 'enabled';

    /**
     * Options field
     */
    const TAGS = 'tags';
    const DOC  = 'doc';

    public static function listAll(){

        return di_datasource_doc::where( self::ENABLED, true );
    } 

    public static function listAllCode(){
        return di_datasource_doc::select( [ self::CODE, self::NAME ] )
                                ->where( self::ENABLED, true )
                                ->get();
    }

    public static function findByCode( $code ){
        return di_datasource_doc::where( self::CODE, $code)
                                ->where( self::ENABLED, true )
                                ->orderBy( self::UPDATED_AT, 'desc')
                                ->first();
        
    }

    public static function count(){
        return
            di_datasource_doc::where( self::ENABLED, true )->count();
    }
}