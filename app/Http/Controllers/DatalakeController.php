<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Utils\Debug;

use App\Entities\DataInsight\t_tags;
use App\Entities\Schema\di_datasource_doc;
use App\Entities\Schema\di_schema_doc;
use App\Entities\Schema\di_schema_samples;


class DatalakeController extends Controller
{
    public function statistics(Request $request){

        return $this->responseSuccess( [
            'datasources' => [
                'count' => di_datasource_doc::count()
            ],
            'schemas' =>[
                'count' => di_schema_doc::count()
            ],
            'data_samples' => [
                'count' => di_schema_samples::count()
            ],
            'tags' =>[
                'count' => t_tags::count()
            ]
        ] );
    }
}
