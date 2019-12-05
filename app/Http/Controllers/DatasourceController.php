<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Utils\Debug;

use App\Entities\Schema\di_datasource_doc;


class DatasourceController extends Controller
{
    public function all(Request $request){

        $pageSize = $this->param( 'page_size', 25 );

        $found = di_datasource_doc::listAll()->paginate( (int)$pageSize  );

        return $this->responseSuccess( $found );
    }

    public function listAll(){

        $ret = [];
        $datasources = di_datasource_doc::listAllCode();
        if( $datasources!=null ){
            foreach( $datasources as $ds ){
                $ret[ $ds->code ] = [
                    'code' => $ds->code,
                    'name' => $ds->name
                ];
            }
        }

        return $this->responseSuccess( array_values( $ret ) );
    }

    public function show( $dsId ){
        return $this->responseSuccess(
            di_datasource_doc::find( $dsId )
        );
    }

    
    public function store(Request $request, $id ){
        $validator = Validator::make($request->all(), [
            'name'     => 'string|max:2048',
            'tags'     => 'array',
        ]);

        if( $validator->fails() ){
            return $this->responseError( -1, $validator->errors() );
        }

        $name = $this->param('name');
        $tags = $this->param('tags');

        

    }

    public function getSchemasByCode( Request $request){
        $validator = Validator::make($request->all(), [
            'code'     => 'required|string|min:1|max:128',
        ]);

        if( $validator->fails() ){
            return $this->responseError( -1, $validator->errors() );
        }

        $code = $this->param('code',null);

        $found = di_datasource_doc::findByCode( $code );
        if( $found==null ){
            return $this->responseSuccess( [] );
        }
        else {
            $schemas = $found->schemas;

            // if not exsit embedded schema, get from relationship table
            if( $schemas == null ){
                $schemas = [];
                $schs = di_datasource_has_schemas::getSchemasByDatasourceCode( $founs->code );
                foreach( $schs as $sch ){
                    array_push( $schemas, $sch );
                }
            }
            return $this->responseSuccess( $schemas );
        }
    }

    public function updateDoc(Request $request ){
        $validator = Validator::make($request->all(), [
            'code'        => 'required|string',
            'content'     => 'nullable|string',
            'mine_type'   => 'required|string|in:text/plain,text/markdown,text/html',
        ]);

        if( $validator->fails() ){
            return $this->responseError( -1, $validator->errors() );
        }

        $code       = $this->param('code');
        $content    = $this->param('content');
        $mineType   = $this->param('mine_type');

        $doc = di_datasource_doc::findByCode( $code );
        if( $doc==null ){
            $msg = "di_datasource_doc:$code not found for update doc";
            Debug::error( "ERROR: $msg" );
            return $this->responseError( -1, $msg );
        }

        try {
            if( $content==null ){
                $doc->doc = null;
            }
            else {
                $doc->doc = [
                    'mine_type' => $mineType,
                    'content'   => $content,
                    'changed_by' => 'anonymous', //T.B.D-Pls implement login,
                    'changed_at' => new \DateTime()
                ];
            }

            // update doc
            $doc->save();

            Debug::normal("Update doc od datasource $code success");
            return $this->responseSuccess( [ 'id' => $doc->id ]);
        }
        catch( \PDOException $e ){
            Debug::error("ERROR: catch exception:". $e->getMessage() );
            return $this->responseError( -1, $e->getMessage() );
        }
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

        $query = di_datasource_doc::where( di_datasource_doc::ENABLED, true );
        if( $tags!=null ){
            $query->whereIn( di_datasource_doc::TAGS, $tags );
        }

        if( $code!=null ){
            $query->where( di_datasource_doc::CODE, $code );
        }

        if( $doc ){
            $query->where( di_datasource_doc::DOC, true );
        }

        return $this->responseSuccess( $query->paginate( $pageSize ) );
    }
}
