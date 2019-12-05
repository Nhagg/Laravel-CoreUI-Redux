
/**
 * Export CSRF function
 */
export function csrf_token() {
    return document.head.querySelector("[name=csrf-token]").content;
}