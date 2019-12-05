import { 
    combineReducers, 
} from 'redux';

class ReducerRegistry {
    _reducers ;

    constructor (){
        this._reducers = {}
    }

    /**
     * Register a new reducer to system registry
     * @param {string}         name 
     * @param {(state,action)} reducer 
     */
    register( name, reducer ){
        this._reducers[ name ] = reducer;        
    }

    combineReducers( additional = {}){
        return combineReducers( {
               ...this._reducers
            }
        )
    }
}

export default new ReducerRegistry();
