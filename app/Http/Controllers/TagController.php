<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Utils\Debug;

use App\Entities\DataInsight\t_tags;


class TagController extends Controller
{
    public function all(Request $request){

        $validator = Validator::make($request->all(), [
            'page_size'         => 'nullable|numberic|min:1|max:200',
            'page'              => 'nullable|numberic',
        ]);

        if( $validator->fails() ){
            return $this->responseError( -1, $validator->errors() );
        }

        // Get parameters
        $pageSize = $this->param('page_size', 200 );

        $found = t_tags::all( $pageSize );

        return $this->responseSuccess( $found );
      
    }

    public function listName(){

        $ret = [];
        $tags = t_tags::listTagName();
        if( $tags!=null ){ 
            foreach( $tags as $tag ){
                array_push( $ret, $tag->tag );
            }
        }

        return $this->responseSuccess( $ret );
    }

    public function append(Request $request){
        $validator = Validator::make($request->all(), [
            'tags'         => 'required|string',
        ]);

        if( $validator->fails() ){
            return $this->responseError( -1, $validator->errors() );
        }

        return $this->responseSuccess( $found );
    }
}
