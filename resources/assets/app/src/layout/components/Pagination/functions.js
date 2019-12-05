
/**
 * Parse pagination format from server to local
 * @param {Object} res : response from Laravel-Pagination 
 */
export function paginationResponseParser( res : Object ){
    return {
        path            : res.path,
        current_page    : res.current_page,
        next_page_url   : res.next_page_url,
        prev_page_url   : res.prev_page_url,
        last_page       : res.last_page,
        per_page        : res.per_page
    }
}