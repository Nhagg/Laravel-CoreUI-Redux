<?php
namespace App\Entities\Schema;

use App\Entities\Schema\BaseModel;

class di_datasource_has_schemas extends BaseModel {
    /**
     * Collenction name
     */
    protected $collection = 'di-datasource-has-schemas';

    /**
     * Mandodary field
     */
    const CODE    = 'code';
    const SCHEMAS = 'schemas';

    public static function getSchemasByDatasourceCode( $dsCode ){
        return 
            di_datasource_has_schemas::where( self::CODE, $dsCode )->get();
    }
}