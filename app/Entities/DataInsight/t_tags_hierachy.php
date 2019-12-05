<?php
namespace App\Entities\DataInsight;

use App\Entities\DataInsight\BaseModel;

class t_tags_hierachy extends BaseModel {


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
    const ID               = "id";
    const ANCESTOR         = "ancestor";
    const DESCENDENT       = "descendent";
    const DISTANCE         = "distance";
    const IS_TOP           = "is_top";
    const IS_BOTTOM        = "is_bottom";
}