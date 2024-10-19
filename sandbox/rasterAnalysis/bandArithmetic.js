require('dotenv').config()

const {
	RASTER_ANALYSIS_ROOT
} = require('./config')
const {
	createHostedImageryService
} = require('./createHostedImageryService')
const {
	generateToken
} = require('./generateToken')

/**
 * Submit new Generate Raster GP Job.
 * @param {Object} param0 - An object containing the following properties:
 *   - token (string): ArcGIS authentication token.
 *   - createServiceResponse (Object): Response object from a previous service creation step. (Optional)
 * @returns {Object} - Response object containing job information or throws an error if unsuccessful.
 * 
 * example of response:
 * ```
 * {
 *   "jobId":"11cba2e5eb994caab277f3df887044c6",
 *   "jobStatus":"esriJobNew"
 * }
 * ```
 */
const submitNewJob = async ({
	token,
	createServiceResponse
}) => {
	const requestURL = RASTER_ANALYSIS_ROOT + "/GenerateRaster/submitJob";
	console.log(requestURL)

	const params = new URLSearchParams({
		f: "json",
		token,
		outputType: 'dynamicLayer',
		rasterFunction: JSON.stringify({
            "name":"Band Arithmetic",
            "description":"Calculates indexes using predefined formulas or a user-defined expression.",
            "function":{
               "type":"BandArithmeticFunction",
               "pixelType":"UNKNOWN",
               "name":"Band Arithmetic",
               "description":"Calculates indexes using predefined formulas or a user-defined expression."
            },
            "arguments":{
               "Raster":{
                  "name":"Raster",
                  "isPublic":false,
                  "isDataset":true,
                  "value":{
                     "url":`https://iservicesdev.arcgis.com/LkFyxb9zDq7vAOAm/arcgis/rest/services/Landsat_Level2_456/ImageServer?token=${token}`,
                     "name":"Landsat_Level2_762"
                  },
                  "type":"RasterFunctionVariable"
               },
               "Method":{
                  "name":"Method",
                  "isPublic":false,
                  "isDataset":false,
                  "value":0,
                  "type":"RasterFunctionVariable"
               },
               "BandIndexes":{
                  "name":"BandIndexes",
                  "isPublic":false,
                  "isDataset":false,
                  "value":"(B3-B6)/(B3+B6)",
                  "type":"RasterFunctionVariable"
               },
               "type":"BandArithmeticFunctionArguments"
            },
            "functionType":0,
            "thumbnail":"",
            "thumbnailEx":"",
            "help":""
        }),
		OutputName: JSON.stringify({
			"serviceProperties": {
				"name": createServiceResponse.name,
				"capabilities": "Image",
				"serviceUrl": createServiceResponse.serviceurl
			},
			"itemProperties": {
				"itemId": createServiceResponse.itemId
			}
		}),
		// context: JSON.stringify({
		// 	"geometry": CLIPPING_GEOM
		// })
	})

	const res = await fetch(requestURL, {
		method: 'POST',
		body: params
	})

	const data = await res.json()

	if (data.error) {
		throw data.error
	}

	return data;
}

const checkJobStatus = async (jobId, token) => {

	const requestURL = RASTER_ANALYSIS_ROOT + `/GenerateRaster/jobs/${jobId}?f=json&token=${token}`;
	console.log('requestURL for checkJobStatus', requestURL)

	const res = await fetch(requestURL)

	const data = await res.json()

	if (data.error) {
		throw data.error
	}

	return data;
}

const start = async () => {

	try {
		const token = await generateToken()
		// console.log(token)

		const serviceName = 'Landsat_Level2_BandArithmetic_' + (Math.random() * 1000).toFixed(0);
		const createServiceResponse = await createHostedImageryService(serviceName, token)
		// console.log(createServiceResponse)

		const bandArithmeticNewJobRes = await submitNewJob({
			createServiceResponse,
			token
		})
		console.log('bandArithmeticNewJobRes', bandArithmeticNewJobRes)

		const checkJobStatusRes = await checkJobStatus(bandArithmeticNewJobRes.jobId, token);
		console.log('checkJobStatusRes', checkJobStatusRes)

	} catch (err) {
		console.log(err);
	}
}

start();