import { SHOW_SEARCH_BAR_IN_HEADER, SHOW_BREADCRUMB_BAR, SEARCH_BAR_REGISTER_CLICK_LISTENER, SEARCH_BAR_REMOVE_CLICK_LISTENER } from "./actionTypes";


export function showSearchBarInHeader( visible : Boolean ){
    return {
        type : SHOW_SEARCH_BAR_IN_HEADER,
        visible : visible
    }
}


export function showBreadcrumbBar( visible : Boolean ){
    return {
        type : SHOW_BREADCRUMB_BAR,
        visible : visible
    }
}


export function searchBarRegisterClickListner( onClick : Function ){
    return {
        type : SEARCH_BAR_REGISTER_CLICK_LISTENER,
        callback: onClick
    }
}


export function searchBarRemoveClickListner( onClick : Function ){
    return {
        type : SEARCH_BAR_REMOVE_CLICK_LISTENER,
        callback: onClick
    }
}