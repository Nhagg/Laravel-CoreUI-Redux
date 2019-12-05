<?php
namespace App\Entities\Schema;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\HybridRelations;

class BaseModel extends Eloquent {
    use HybridRelations;

    /**
     * Default connection
     */
    protected $connection = 'mongo_schema_connection';

    const UPDATED_AT = 'updated_at';
    const CREATED_AT = 'created_at';

    protected $hidden = [
        self::UPDATED_AT,
        self::CREATED_AT,
        'ENABLED',
        'DELETED'
    ];
}