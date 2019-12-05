
import { ReducerRegistry, set } from '../base/redux';
import { SHOW_DATASOURCE_PANEL, STORE_ALL_DATASOURCES, CURRENT_DATA_SOURCE, SEARCH_FILTER } from './actionTypes';
import { Object } from 'core-js';


const STORE_NAME = "features/datasources";

const initUserState = {
    datasourcePanelVisible : true,
    datasourceCurrent : null,
    datasources : [],
    searchFilters : {}
}

ReducerRegistry.register( STORE_NAME, ( state=initUserState, action ) => {
    switch( action.type ){
        case SHOW_DATASOURCE_PANEL:
            return set( state, 'datasourcePanelVisible', action.visible );

        case STORE_ALL_DATASOURCES:
            return set( state, 'datasources', action.datasources );

        case CURRENT_DATA_SOURCE:
            return set( state, 'datasourceCurrent', action.datasource );

        case SEARCH_FILTER:
            return set( state, 'searchFilters', action.filters );

        default:
            return state
    }

    return state;
});