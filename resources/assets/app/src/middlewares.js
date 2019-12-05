

/**
 * Register Middlewares for App
 */
class middlewares{

    constructor(){
        this.stringMiddlewareRegister();
    }

    /**
     * Register new function for String process
     */
    stringMiddlewareRegister(){

        /**
         * format string with parameters
         */
        String.prototype.format = function() {
            var formatted = this;
            for (var i = 0; i < arguments.length; i++) {
                var regexp = new RegExp('\\{'+i+'\\}', 'gi');
                formatted = formatted.replace(regexp, arguments[i]);
            }
            return formatted;
        };
    }
}

export default new middlewares();