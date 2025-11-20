const config = require('../src/config.json');
const {
    ERROR_TERMIAL_OUTPUT_COLOR,
} = require('./constants');
const package = require('../package.json');

/**
 * Load meta tags data for the specified application.
 * @param {*} app - name of the application to load meta tags data for. Should match a key in src/config.json
 * @returns {object} - object containing meta tags data
 */
const getMetaTagsDataForApp = (app)=>{
    console.log(`Loading meta tags data for "${app || 'undefined application'}"`);

    if(!app){
        console.error(ERROR_TERMIAL_OUTPUT_COLOR, 'No application specified for meta tags data retrieval.');
        process.exit(1);
    }

    if(!config){
        console.error(ERROR_TERMIAL_OUTPUT_COLOR, 'No configuration found. Please check src/config.json to ensure it is valid.');
        process.exit(1);
    }

    const appConfig = config[app];

    if(!appConfig){
        console.error(ERROR_TERMIAL_OUTPUT_COLOR, `No configuration found for application: "${app}". Please check src/config.json to ensure the application is defined.`);
        process.exit(1);
    }

    const {
        title,
        description,
        pathname,
    } = appConfig;

    console.log(`Meta tags data for "${app}" is loaded` + '\n');

    return {
        title,
        description,
        author: package.author,
        keywords: Array.isArray(package.keywords) 
            ? package.keywords.join(',') 
            : undefined,
        'og:title': title,
        'og:description': description,
        'og:url': `https://livingatlas.arcgis.com${pathname}/`,
        'og:image': `https://livingatlas.arcgis.com${pathname}/public/thumbnails/${app}.jpg`,
        'last-modified':  new Date().getTime().toString(),
        'last-modified-readable': new Date().toLocaleString(),
    }
}

module.exports = getMetaTagsDataForApp;