
import { ReducerRegistry, set } from '../base/redux';
import { GET_STATISTICS_DATALAKE, UPDATE_ALL_TAGS } from './actionTypes';


const STORE_NAME = "features/dashboard";

const initUserState = {
    statistics : null,
    allTags: []
}

ReducerRegistry.register( STORE_NAME, ( state=initUserState, action ) => {
    switch( action.type ){

        case GET_STATISTICS_DATALAKE:
            return set( state, 'statistics', action.statistics );

        case UPDATE_ALL_TAGS:
            return  set( state, 'allTags', action.tags );

        default:
            return state
    }
});