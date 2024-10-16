const { ARCGIS_ONLINE_PORTAL_REST_ROOT, USERNAME, PASSWORD } = require("./config");

/**
 * Generate a access token for ArcGIS Online
 * @returns Promise<string> token string that expires in 15 minutes
 */
const generateToken = async()=>{

    if(!USERNAME || !PASSWORD){
        throw new Error('ArcGIS Online credential is required to generate token. Please make sure they are in the .env file')
    }

    const params = new URLSearchParams({
        'username': USERNAME,
        'password': PASSWORD,
        // Tried to use requestip but had issue using the generated token to export image from the imagery server like Landsat Level-2
        // Figured out this workaround to use the referrer as client and pass an arbitary referrer URL... 
        'client': 'referer',
        'referer': 'https://www.arcgis.com', 
        'expiration': '15',
        'f': 'json',
    })

    const res = await fetch(
        `${ARCGIS_ONLINE_PORTAL_REST_ROOT}/generateToken`,
        {
            method: 'POST',
            body: params
        }
    );

    const data = await res.json()
    // console.log(data)

    if(data?.error){
        throw data.error;
    }

    // console.log(res, data)
    return data?.token

}

module.exports = {
    generateToken
}