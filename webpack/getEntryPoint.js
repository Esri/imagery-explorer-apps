const {
    ERROR_TERMIAL_OUTPUT_COLOR,
} = require('./constants');

const {
    ENTRY_POINTS_BY_APP_NAME,
} = require('./config');

/**
 * Get the entry point file path for a given application.
 * 
 * @param {*} app - application name matching keys in src/config.json 
 * @returns {string} - entry point file path
 */
const getEntryPointByApp = (app)=>{

    console.log(`Retrieving entry point for "${app || 'undefined application'}"`);

    if(!app){
        console.error(ERROR_TERMIAL_OUTPUT_COLOR, 'No application specified for entry point retrieval.');
        process.exit(1);
    }

    const ENTRYPOINTS = ENTRY_POINTS_BY_APP_NAME;

    if(!ENTRYPOINTS){
        console.error(ERROR_TERMIAL_OUTPUT_COLOR, 'No entry points defined. Please check the ENTRY_POINTS_BY_APP_NAME constant in ./webpack/constants.js');
        process.exit(1);
    }

    if(!ENTRYPOINTS[app]){
        console.error(ERROR_TERMIAL_OUTPUT_COLOR, `No entry point found for "${app}". Make sure the application name is correct and the entry point is defined in ENTRY_POINTS_BY_APP_NAME constant in ./webpack/constants.js`);
        process.exit(1);
    }

    console.log(`Entry point for "${app}":`, ENTRYPOINTS[app] + '\n');

    return ENTRYPOINTS[app];
}

module.exports = getEntryPointByApp;