import { useTranslation  as reactI18nextTranslate } from 'react-i18next';

/**
 * Wraps a specific React Component in order to enable translations in it.
 *
 * @param {Component} component - The React Component to wrap.
 * @param {Object} options - Additional options to pass into react-i18next's
 * initialization.
 * @returns {Component} The React Component which wraps {@link component} and
 * enables translations in it.
 */
export function translate(component, options = { wait: true }) {
    // Use the default list of namespaces.
    return (
        reactI18nextTranslate( component));
}


/**
 * 
 * @param {String} lang Language (en,vi,ja) 
 */
export function changeLanguage( lang ){
    const code = lang.toLowerCase();
}