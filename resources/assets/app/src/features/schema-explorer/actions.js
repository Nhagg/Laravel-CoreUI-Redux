
import { Config } from '../../config';
import { doHttpGet } from '../../api';
import { 
    UPDATE_SCHEMA_HIDDEN_LIST, 
    UPDATE_SCHEMA_CURRENT, 
    SET_SCHEMA_PANEL_MAXIMIZE, 
    SET_OVERVIEW_PANEL_MAXIMIZE 
} from './actionTypes';


export function doGetAllSchema( onSuccess, onFailure, url ){
    const uri = url != null ? url : `${Config.DATA_INSIGHT_API_BASE}/schemas`;

    return (dispatch, getState) => {
        doHttpGet( uri )
        .then( 
            result  => onSuccess( result ),
            failure => onFailure( failure )
        )
        .catch( e=>{
            console.error("Response error", e );
        })
    }
}

export function doGetSchema( schemaId, onFailure ){
    const uri = `${Config.DATA_INSIGHT_API_BASE}/schemas/${schemaId}`;
    console.log("Get schema of schemaId:" + schemaId );

    return (dispatch, getState) => {
        doHttpGet( uri )
        .then( 
            result  => {
                dispatch( updateSchemaCurrent( result ) )
            },
            failure => onFailure( failure )
        )
        .catch( e=>{
            console.error("Response error", e );
        })
    }
}


export function doGetSchemaByCode( $schemaCode, onSuccess, onFailure ){
    const uri = `${Config.DATA_INSIGHT_API_BASE}/schemas/get-by-code?code=${$schemaCode}`;

    return (dispatch, getState) => {
        doHttpGet( uri )
        .then( 
            result  => onSuccess( result ),
            failure => onFailure( failure )
        )
        .catch( e=>{
            console.error("Response error", e );
        })
    }
}


export function doGetSchemaHiddenList( onFailure ){
    const uri = `${Config.DATA_INSIGHT_API_BASE}/schemas/hidden-list`;

    return (dispatch, getState) => {
        doHttpGet( uri )
        .then( 
            result  => {
                dispatch( {
                        type : UPDATE_SCHEMA_HIDDEN_LIST,
                        list : result
                    }
                )
            },
            failure => onFailure( failure ) 
        )
        .catch( e=>{
            console.error("Response error", e );
        })
    }
}

export function updateSchemaCurrent( schema : Object ){
    return {
        type: UPDATE_SCHEMA_CURRENT,
        schema: schema
    }
}

export function doGetSchemaDataSamples( schemaCode :String, onSuccess, onFailure, urlPage ){
    const uri = urlPage != null ? urlPage : `${Config.DATA_INSIGHT_API_BASE}/schemas/samples?code=${schemaCode}`;

    return (dispatch, getState) => {
        doHttpGet( uri )
        .then( 
            result  => onSuccess( result ),
            failure => onFailure( failure )
        )
        .catch( e=>{
            console.error("Response error", e );
        })
    }
}

export function setSchemaPanelMaximize( isMaximize : Boolean ){
    return {
        type: SET_SCHEMA_PANEL_MAXIMIZE,
        isMaximize: isMaximize
    }
}

export function setOverviewPanelMaximize( isMaximize : Boolean ){
    return {
        type: SET_OVERVIEW_PANEL_MAXIMIZE,
        isMaximize: isMaximize
    }
}
