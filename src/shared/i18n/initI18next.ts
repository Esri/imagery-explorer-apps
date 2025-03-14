import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextLocalesLoader from 'i18next-http-backend';
import { format } from 'date-fns';
import { APP_NAME, AppName } from '@shared/config';

/**
 * load the locale files from `./public/locales/` for the current page
 * and initiate i18next library
 *
 * @returns void
 */
export const initI18next = async (language = 'en') => {
    // get the "last-modified" meta tag, which gets added to 'index.html' file during the build process by webpack
    const lastModifiedMetaTag = document.querySelector(
        'meta[name="last-modified"]'
    );
    console.log('lastModifiedMetaTag', lastModifiedMetaTag);

    // get the content from 'last-modified' meta tag or use a placeholder value in case the "last-modified" meta tag is not found.
    const lastModifiedTimestamp =
        lastModifiedMetaTag?.getAttribute('content') ||
        format(new Date(), 'yyyy-MM-dd');

    const i18nextLocalesLoader = new I18nextLocalesLoader(null, {
        loadPath: `./public/locales/{{lng}}/{{ns}}.json?modified=${lastModifiedTimestamp}`,
    });

    const app: AppName = APP_NAME;

    await i18next
        .use(i18nextLocalesLoader)
        .use(initReactI18next)
        .init({
            lng: language,
            /**
             * set this to true so that locale will be fully lowercased,
             * otherwise it will convert "pt-br" to "pt-BR" which can cause issue
             * when load the locale files
             */
            lowerCaseLng: true,
            load: 'currentOnly',
            fallbackLng: 'en',
            /**
             * each of these namespaces below will be mapped to a file in the the `./public/locales/{{lang}}` folder.
             *
             * each page will have three namespaces or locale files:
             *
             * - the locale file for app (e.g. "landsatexplorer.json" , "sentinel1explorer.json") that contains strings for the current page that are not used by any other page
             * - "common.json" locale file that contains strings shared by different apps
             */
            ns: [app, 'common'],
            /**
             * the default namespace to use when no namespace is specified in the translation function
             * e.g. t('key') will use the 'common' namespace by default
             */
            defaultNS: 'common',
        });
};
