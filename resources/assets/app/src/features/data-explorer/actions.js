

import { 
    SHOW_DATASOURCE_PANEL, 
    STORE_ALL_DATASOURCES, 
    CURRENT_DATA_SOURCE,
    SEARCH_FILTER
} from './actionTypes';

import queryString from 'query-string';

import { Config } from '../../config';
import { doHttpGet, doHttpPost } from '../../api';

export function doGetAllDatasource( onSuccess, onFailure, params ){
    const uri = `${Config.DATA_INSIGHT_API_BASE}/datasources/search?` + queryString.stringify(params);

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

function updateCurrentDatasource( ds ){
    return {
        type : CURRENT_DATA_SOURCE,
        datasource: ds
    }
}

export function doGetAllDatasourceCode(  onFailure ){
    const uri = `${Config.DATA_INSIGHT_API_BASE}/datasources/list-all`;

    return (dispatch, getState) => {
        doHttpGet( uri )
        .then( 
            result  => {
                dispatch( {
                    type : STORE_ALL_DATASOURCES,
                    datasources : result
                })
            },
            failure => onFailure( failure )
        )
        .catch( e=>{
            console.error("Response error", e );
        })
    }
}

export function doGetSchemasOfDatasourceByCode( dsCode : String, onSuccess,  onFailure ){
    const uri = `${Config.DATA_INSIGHT_API_BASE}/datasources/schemas?code=${dsCode}`;

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

export function showDatasourcePanel( show : Boolean ){
    return {
        type : SHOW_DATASOURCE_PANEL,
        visible : show
    }
}

export function doUpdateDatasourceDocByCode( doc, onSuccess, onFailure ){
    const uri = `${Config.DATA_INSIGHT_API_BASE}/datasources/update-doc`;

    return (dispatch, getState) => {
        doHttpPost( uri, {
            code      : doc.code,
            mine_type : doc.mineType,
            content   : doc.content
        } )
        .then( 
            result  => onSuccess( result ),
            failure => onFailure( failure )
        )
        .catch( e=>{
            console.error("Response error", e );
        })
    }
}

export function doUpdateDatasourceNameTags( ds, onSuccess, onFailure ){
    const uri = `${Config.DATA_INSIGHT_API_BASE}/datasources/${ds._id}`;

    return (dispatch, getState) => {
        doHttpPut( uri, {
            name      : doc.name,
            tags : doc.tags
        } )
        .then( 
            result  => onSuccess( result ),
            failure => onFailure( failure )
        )
        .catch( e=>{
            console.error("Response error", e );
        })
    }
}

export function setSearchFilter( filters : Object ){
    return {
        type : SEARCH_FILTER,
        filters : filters
    }
}