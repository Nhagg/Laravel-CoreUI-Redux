<?php
namespace App\Entities\Schema;

use App\Entities\Schema\BaseModel;

class di_schema_doc extends BaseModel {
    /**
     * Collenction name
     */
    protected $collection = 'di-schema-doc';

    protected $dates = ['doc.created_at','fields.doc.created_at'];

    /**
     * Mandodary field
     */
    const ID      = "_id";
    const CODE    = 'code';
    const NAME    = 'name';
    const ENABLED = 'enabled';

    /**
     * Options field
     */
    const TAGS = 'tags';
    const DOC  = 'doc';

    public static function list( $pageSize=200){

        return di_schema_doc::where( self::ENABLED, true );
    } 

    public static function getByCode( $code ){
        return di_schema_doc::where( self::CODE, $code )
                            ->where( self::ENABLED, true )
                            ->orderBy( self::UPDATED_AT, 'desc' )
                            ->first();
    }

    public static function count(){
        return
            di_schema_doc::where( self::ENABLED, true )->count();
    }

    public static function find( $id ){
        return
            di_schema_doc::where( self::ID, $id )
                ->where( self::ENABLED, true)
                ->first();
    }
}