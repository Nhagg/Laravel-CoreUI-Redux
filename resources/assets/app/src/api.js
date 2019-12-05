
/**
 * Get HTTP request
 * @param {string} uri 
 */
export function doHttpGet( uri: String ){
    return doHttpRequest( 'GET', uri );
}

/**
 * Post HTTP request
 * @param {string} uri 
 * @param {string|Object} jsonBody 
 */
export function doHttpPost( uri : String, jsonBody : String|Object ){
    return doHttpRequest( 'POST', uri, jsonBody );
}


/**
 * Put HTTP request
 * @param {string} uri 
 * @param {string|Object} jsonBody 
 */
export function doHttpPut( uri : String, jsonBody : String|Object ){
    return doHttpRequest( 'PUT', uri, jsonBody );
}

/**
 * Delete HTTP request
 * @param {string} uri 
 */
export function doHttpDelete( uri ){
    return doHttpRequest( 'DELETE', uri );
}


/**
 * Fetch data from server
 * 
 * @param {GET|POST|PUT|DELETE} method restful
 * @param {string} uri URI 
 * @param {striung} jsonBody data object or string json 
 */
function doHttpRequest( method :String, uri : String, jsonBody : String|Object ){
    var jsonBody = jsonBody;
    if( typeof jsonBody === 'object' ){
        jsonBody = JSON.stringify(jsonBody);
    }

    console.log(`#### HTTP doHttpRequest: ${method}/${uri}`);


    var body = {
        method: method,
        headers:{ "content-type":"application/json" },
        credentials: 'include'
    };

    if( (method != 'GET') && (method!='DELETE') ){
        body.body = jsonBody;
    }

    return fetch( uri, body)
        .then( response => {
            if( response.status===200 ){
                try{
                    return response.json()
                } catch (e) {
                    throw new Error("Cannot passer Response to json:" + e );
                }
            }
            else{
                throw new Error("Request server failed: status=" + response.status );
            }
        })
        .then( response => {
            /* Server return format with template: {
                status : 0 // for ok, -1,-2: for error-code
                result : <response-data> 
            } */
            if( response.status !== 0 ){
                console.warn(`[API] doHttpRequest return error=${response.status}`, response );
                return Promise.reject( response );
            }
            return Promise.resolve( response.result );
        })
        .catch( error => {
            console.error('[API] doHttpRequest exception:'+ uri,  error );
            throw error;
        });
}