/* @flow */

import BrowserLanguageDetector from 'i18next-browser-languagedetector';

/**
 * The ordered list (by name) of language detectors to be utilized as backends
 * by the singleton language detector for Web.
 *
 * @type {Array<string>}
 */
const order = [
    'querystring',
    'localStorage'
];

/**
 * The singleton language detector for Web.
 */
const languageDetector
    = new BrowserLanguageDetector(
        /* services */ null,
        /* options */ {
            caches: [ 'localStorage' ],
            lookupLocalStorage: 'language',
            lookupQuerystring: 'lang',
            order
        });

export default languageDetector;
