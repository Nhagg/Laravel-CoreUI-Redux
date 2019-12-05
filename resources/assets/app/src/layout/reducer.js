import { ReducerRegistry, set } from '../features/base/redux';
import { 
    SHOW_SEARCH_BAR_IN_HEADER, 
    SHOW_BREADCRUMB_BAR,
    SEARCH_BAR_REGISTER_CLICK_LISTENER,
    SEARCH_BAR_REMOVE_CLICK_LISTENER
} from './actionTypes';


/**
 * The name of the redux store/state property which is the root of the redux
 * state of the feature {@code welcome}.
 */
const STORE_NAME = "features/layout";

const initState = {
    searchBarVisible : true,
    breadcrumbBarVisible : false,
    searchBarClickListeners : []
};

/**
 * Reduces redux actions for the purposes of the feature {@code welcome}.
 */
ReducerRegistry.register( STORE_NAME, (state = initState, action) => {

    switch (action.type) {
        case SHOW_SEARCH_BAR_IN_HEADER: 
            return set( state, 'searchBarVisible', action.visible);

        case SHOW_BREADCRUMB_BAR:
            return set( state, 'breadcrumbBarVisible', action.visible);

        case SEARCH_BAR_REGISTER_CLICK_LISTENER:
            const listeners = state[ 'searchBarClickListeners' ];
            listeners.push( action.callback );
            return set( state, 'searchBarClickListeners', listeners );

        case SEARCH_BAR_REMOVE_CLICK_LISTENER:
            const listeners1 = state[ 'searchBarClickListeners' ];
            listeners1.pop( action.callback );
            return set( state, 'searchBarClickListeners', listeners1 );
    }

    return state;
});