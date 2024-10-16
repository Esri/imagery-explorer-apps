const { ARCGIS_ONLINE_PORTAL_REST_ROOT, USERNAME } = require("./config");

/**
 * Create a new hosted Imagery Service on ArcGIS Online.
 * 
 * This function sends a request to the ArcGIS Online API to create an image service with the specified name and properties.
 * It constructs the request parameters and posts them to the appropriate API endpoint.
 * 
 * @param {string} name - The name of the imagery service to be created.
 * @param {string} token - The authentication token for the ArcGIS Online API.
 * 
 * @returns {Promise<Object>} A promise that resolves with the API response object containing details of the created service.
 * 
 * @throws {Error} Throws an error if the API response contains an error.
 * 
 * Example response from the API:
 * ```
 * {
 *   "encodedServiceURL": "https://service.arcgis.com/Gkz.../arcgis/rest/services/Name_of_the_service/ImageServer",
 *   "itemId": "7eeab1...",
 *   "name": "Name_of_the_service",
 *   "serviceItemId": "7eeab1...",
 *   "serviceurl": "https://service.arcgis.com/Gkz.../arcgis/rest/services/Name_of_the_service/ImageServer",
 *   "size": -1,
 *   "success": true,
 *   "type": "Image Service",
 *   "typeKeywords": [
 *     "Dynamic Imagery Layer"
 *   ],
 *   "isView": false
 * }
 * ```
 */
const createHostedImageryService = async(name, token)=>{
    const params = new URLSearchParams({
        createParameters: JSON.stringify({
            name,
            "description":"",
            "capabilities":"Image",
            "properties":{
                "isCached":true,
                "path":"@",
                "description":"",
                "copyright":""
            }
        }),
        outputType: 'imageService',
        f: 'json',
        token
    })

    const requestURL = `${ARCGIS_ONLINE_PORTAL_REST_ROOT}/content/users/${USERNAME}/createService`

    const res = await fetch(requestURL, {
        method: 'POST',
        body: params
    })

    const data = await res.json()

    if(data.error){
        throw data.error
    }

    if(!data?.success){
        throw data
    }

    return data
}

module.exports = {
    createHostedImageryService
}