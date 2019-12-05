<?php
namespace App\Entities\Schema;

use App\Entities\Schema\BaseModel;

class di_schema_samples extends BaseModel {
    /**
     * Collenction name
     */
    protected $collection = 'di-schema-samples';

    protected $dates = ['doc.created_at','fields.doc.created_at'];

    /**
     * Mandodary field
     */
    const CODE      = 'code';
    const SAMPLES   = 'samples';
    const ENABLED   = 'enabled';

    public static function getByCode( $schemaCode ){

        return di_schema_samples::where( self::CODE, $schemaCode );
    } 

    public static function count(){
        return
            di_schema_samples::where( self::ENABLED, true )->count();
    }
}