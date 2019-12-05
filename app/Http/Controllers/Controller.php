<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController 
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function responseSuccess( $data ){
        return response()->json([
            'status' => 0,
            'result' => $data
        ]);
    }

    public function responseError( $code, $message ){
        return response()->json([
            'status' => -1,
            'message' => $message
        ]);
    }

    /**
     * Read a parameter from request
     * @param String $key key by string
     * @param String $def default object
     * @return string|default value
     */
    protected function param( $key, $def = null ){
        $param = Input::get( $key );

        if( $param==null ){
            return $def;
        }
        return $param;
    }
}
