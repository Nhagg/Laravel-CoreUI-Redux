
import { ReducerRegistry, set } from '../base/redux';
import { 
    UPDATE_SCHEMA_HIDDEN_LIST, 
    UPDATE_SCHEMA_CURRENT, 
    SET_OVERVIEW_PANEL_MAXIMIZE, 
    SET_SCHEMA_PANEL_MAXIMIZE
} from './actionTypes';


const STORE_NAME = "features/schemas";

const initUserState = {
    schemaHiddenList : [],
    schemaCurrent : null,
    overviewPanelMaximize : false,
    schemaPanelMaximize : false
}

ReducerRegistry.register( STORE_NAME, ( state=initUserState, action ) => {
    switch( action.type ){

        case UPDATE_SCHEMA_HIDDEN_LIST:
            return set( state, 'schemaHiddenList', action.list );

        case UPDATE_SCHEMA_CURRENT:
            return set( state, 'schemaCurrent', action.schema );

        case SET_OVERVIEW_PANEL_MAXIMIZE:
            return set( state, 'overviewPanelMaximize', action.isMaximize );

        case SET_SCHEMA_PANEL_MAXIMIZE:
            return set( state, 'schemaPanelMaximize', action.isMaximize );

        default:
            return state
    }
});