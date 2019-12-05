<?php namespace App\Http\Utils;


use Illuminate\Support\Facades\Log;

class Debug {
    
    const ALGO_DEBUG = true;
    
    public static function error( $msg ){
        Log::error( '[ERROR]' . $msg );
    }
    
    public static function normal( $msg ){
        Log::info( $msg );
    }
    
    public static function dbg( $msg ){
        Log::debug( $msg );
    }
    
    public static function warn( $msg ){
        Log::warning( $msg );
    }
    
    public static function printStackTrace( \Exception $e ){
//         Log::error( $e->getTraceAsString()  );
    }
    
    public static function tracePoint( $msg=null ){
        
        if( !self::ALGO_DEBUG ) return;
        
        $trace = debug_backtrace()[0];
        Log::debug( "TRACE::" . basename($trace['file']) . "(" . $trace['line'] .")" . 
                (($msg !=null) ? "MSG:" . $msg : "") );
    }
    
    /**
     * Convert an Object to string-readable
     * @param object $obj
     * @return string
     */
    static public function readable( $obj )
    {
        //echo '<pre>';
        ob_start();
        print_r( $obj );
    
        $fmt = ob_get_contents();
        ob_end_clean();
    
        return $fmt;
    }
    
}