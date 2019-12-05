

import { USER_SET_PROFILE, USER_SET_AVATAR } from './actionTypes';

/**
 * Set pfile of current user
 * @param {string}      userName 
 * @param {string}      email 
 * @param {string|null} userName2 (Fogrein name)
 */
export function setUserProfile( userName, email, userName2 = null ){
    return {
        type: USER_SET_PROFILE,
        userName,
        email,
        userName2 
    }
} 

export function setUserAvatar( avatarUrl ){
    return {
        type        : USER_SET_AVATAR,
        avatarUrl   : avatarUrl
    }
}

