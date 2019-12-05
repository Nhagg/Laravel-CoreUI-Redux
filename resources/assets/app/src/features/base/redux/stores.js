import { createStore  as reduxCreateStore, compose, applyMiddleware } from 'redux';
import { default as ReducerRegistry } from './registry';
import thunk from 'redux-thunk';

/**
 * Create store for application
 */
export function createStore(){
    if( window.APP === 'undefined' ){
        window.APP = {}
    }

    // Create store for app
    window.APP =  { store : reduxCreateStore( 
        ReducerRegistry.combineReducers(),
        compose(applyMiddleware(thunk))
    )};
}

/**
 * Get current store
 */
export function getStore(){
    return window.APP.store;
}

/**
 * Get current state
 * @param {string} name state names
 */
export function getState( name = null ){
    return window.APP.store.getState( name );
}

/**
 * 
 * @param {func} action 
 */
export function dispatchAction( action ){
    window.APP.store.dispatch( action );
}