<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Utils\Debug;

use App\Entities\Schema\di_schema_doc;
use App\Entities\Schema\di_schema_samples;
use App\Entities\DataInsight\t_schema_marks;


class SchemaController extends Controller
{
    public function all(Request $request){

        $pageSize = $this->param( 'page_size', 20 );

        $found = di_schema_doc::list()->paginate( $pageSize );

        return $this->responseSuccess( $found );
    }

    public function getHiddenSchema(){
        $ret = [];
        $schemas = t_schema_marks::getHiddenList();
        if( $schemas!=null ){
            foreach( $schemas as $schema ){
                array_push( $ret, $schema->code );
            }
        }
        return $this->responseSuccess( $ret );
    } 


    public function search( Request $request ){
        $validator = Validator::make($request->all(), [
            'code'      => 'nullable|string|min:1|max:128',
            'tags'      => 'nullable|string',
            'doc'       => 'nullable|string|in:true,false',
            'page_size' => 'nullable|number|min:1:max:200'
        ]);

        if( $validator->fails() ){
            return $this->responseError( -1, $validator->errors() );
        }

        // Read parameters
        $pageSize = $this->param('page_size', 25 );

        $tags = $this->param('tags');
        if( $tags!=null ){
            $tags = explode(',', $tags );
        }

        $code = $this->param('code');
        $doc  = strtolower( $this->param('doc') ) == 'true';

        if( ($tags==null) && ( $code==null ) && $this->param('doc')==null ){
            return $this->responseError( -1, 'query tags or code are required');
        }


        // $query = di_schema_doc::select( [
        //     di_schema_doc::CODE,
        //     di_schema_doc::NAME,
        //     di_schema_doc::TAGS
        // ]);

        $query = di_schema_doc::where(true);
        if( $tags!=null ){
            $query->whereIn( di_schema_doc::TAGS, $tags );
        }

        if( $code!=null ){
            $query->where( di_schema_doc::CODE, $code );
        }

        if( $doc ){
            $query->where( di_schema_doc::DOC, true );
        }

        Debug::normal("Query schema by tags:" . json_encode( $tags ) .", code:${code}");
        return $this->responseSuccess( $query->paginate() );
    }

    public function getByCode( Request $request ){
        $validator = Validator::make($request->all(), [
            'code'     => 'nullable|string|min:1|max:128',
        ]);

        if( $validator->fails() ){
            return $this->responseError( -1, $validator->errors() );
        }

        $code = $this->param('code');

        return $this->responseSuccess(
            di_schema_doc::getByCode( $code )
        );
    }

    public function show( $schemaId ){
        return $this->responseSuccess(
            di_schema_doc::find( $schemaId )
        );
    }

    public function getDataSamples( Request $request ){

        $validator = Validator::make($request->all(), [
            'code'          => 'required|string|min:1|max:200',
            'page_size'     => 'nullable|number|min:1|max:200',
        ]);

        if( $validator->fails() ){
            return $this->responseError( -1, $validator->errors() );
        }

        $pageSize = $this->param( 'page_size', 25);
        $code     = $this->param( 'code' );

        return $this->responseSuccess(
            di_schema_samples::getByCode( $code )->paginate( $pageSize )
        );
    }
}
