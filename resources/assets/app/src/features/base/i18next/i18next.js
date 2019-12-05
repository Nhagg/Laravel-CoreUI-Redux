// @flow

import i18n from 'i18next';
import I18nextXHRBackend from 'i18next-xhr-backend';

import {initReactI18next} from 'react-i18next';

import languageDetector from './languageDetector';

/**
 * The available/supported languages.
 *
 * XXX The element at index zero is the default language.
 *
 * @public
 * @type {Array<string>}
 */
//export const LANGUAGES: Array<string> = Object.keys(LANGUAGES_RESOURCES);

/**
 * The default language.
 *
 * XXX The element at index zero of {@link LANGUAGES} is the default language.
 *
 * @public
 * @type {string} The default language.
 */
//export const DEFAULT_LANGUAGE = LANGUAGES[0];

/**
 * The options to initialize i18next with.
 *
 * @type {Object}
 */
const options = {
    backend: {
        // for all available options read the backend's repository readme file
        loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    },
    react: {
        wait: true
    }
};

i18n
    .use( I18nextXHRBackend)
    .use( languageDetector )
    .use( initReactI18next )
    .init( options );

export default i18n ;
