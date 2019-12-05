

import { SHOW_DATASOURCE_PANEL, STORE_ALL_DATASOURCES, GET_STATISTICS_DATALAKE, UPDATE_ALL_TAGS } from './actionTypes';



import { Config } from '../../config';
import { doHttpGet } from '../../api';


export function doGetStatisticsDatalake( onFailure, url ){
    const uri = `${Config.DATA_INSIGHT_API_BASE}/datalake/statistics`;

    return (dispatch, getState) => {
        doHttpGet( uri )
        .then( 
            result  => {
                dispatch({
                    type : GET_STATISTICS_DATALAKE,
                    statistics: result
                })
            },
            failure => onFailure( failure )
        )
        .catch( e=>{
            console.error("Response error", e );
        })
    }
}


export function doGetAllTags( onFailure, url ){
    const uri = `${Config.DATA_INSIGHT_API_BASE}/tags/list-name`;

    return (dispatch, getState) => {
        doHttpGet( uri )
        .then( 
            result  => {
                dispatch({
                    type : UPDATE_ALL_TAGS,
                    tags: result
                })
            },
            failure => onFailure( failure )
        )
        .catch( e=>{
            console.error("Response error", e );
        })
    }
}