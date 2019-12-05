
import { ReducerRegistry } from '../base/redux';
import { 
    USER_SET_PROFILE,
    USER_SET_AVATAR
} from './actionTypes';
import { setUserProfile   } from './actions';

const initUserState = {
    avatarUrl : null,
    userName  : null,
    userName2 : null,
    email     : null
}

ReducerRegistry.register( 'user', ( state={}, action ) => {
    switch( action.type ){
        case USER_SET_PROFILE:
            return Object.assign( state, {
                    userName  : action.userName,
                    userName2 : action.userName2,
                    email     : action.email 
            })

        case USER_SET_AVATAR:
            return Object.assign( state, {
                avatarUrl : action.avatarUrl
            })

        default:
            return state
    }

    return state;
});