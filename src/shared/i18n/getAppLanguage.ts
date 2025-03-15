/**
 * Retrieves the application language from the URL query parameters.
 *
 * This function looks for the "lang" query parameter in the current URL.
 * If the parameter is found, its value is returned in lowercase.
 * If the parameter is not found, 'en' is returned as the default language.
 *
 * @returns {string} The language code from the URL query parameter or 'en' if not found.
 */
export const getAppLanguage = () => {
    // get the "lang" query parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const lang = searchParams.get('lang');

    // if the lang query parameter is not found, return 'en' as default
    if (!lang) {
        return 'en';
    }

    // if the lang query parameter is found, return it
    return lang.toLowerCase();
};
