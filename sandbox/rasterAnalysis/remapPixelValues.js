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
            "name":"Remap",
            "description":"Changes pixel values by assigning new values to ranges of pixel values or using an external table.",
            "function":{
               "type":"RemapFunction",
               "pixelType":"UNKNOWN",
               "name":"Remap",
               "description":"Changes pixel values by assigning new values to ranges of pixel values or using an external table."
            },
            "arguments":{
               "Raster":{
                  "name":"Raster",
                  "isPublic":false,
                  "isDataset":true,
                  "value":{
                     "url":"https://iservicesdev.arcgis.com/LkFyxb9zDq7vAOAm/arcgis/rest/services/Landsat_Level2_BandArithmetic_966/ImageServer?token=9RK8DY0qvaqYcPFrrqGyoc_Hw2w_BiuUfWSbVAwTisP5_rcoZesuFjwM_Y5mRo0ow_UCCbyhr3VWNLAkFpt5n2NArsT6paTQXYXukY1LUWxI958EoRgakDYGEmRp1ggPY_bf_dE0dxa5lya6Hdx2_AfAZBq5zV6BWbwAY-8rlob0upRmIZ7-cpTzEZj0ZzC3LGXrrnf1a0XqGaXAM-fuS0eVzePb5Y7aTbSSWi-rxWWnmrS0CjukX50joiZlUisdukQe3MRXnay6AzR7qcsWMi9gaZI-D4jPbPdjpKdlo_InYIdRFhF4KJx4Zua9_pYDmwU0TlyX47LVbIHdruNYHddh5ECDIhu7cL7pSIMSSA8.",
                     "name":"Landsat_Level2_BandArithmetic_966"
                  },
                  "type":"RasterFunctionVariable"
               },
               "UseTable":{
                  "name":"UseTable",
                  "isPublic":false,
                  "isDataset":false,
                  "value":false,
                  "type":"RasterFunctionVariable"
               },
               "InputRanges":{
                  "name":"InputRanges",
                  "isPublic":false,
                  "isDataset":false,
                  "value":[
                     0,
                     1
                  ],
                  "type":"RasterFunctionVariable"
               },
               "OutputValues":{
                  "name":"OutputValues",
                  "isPublic":false,
                  "isDataset":false,
                  "value":[
                     1
                  ],
                  "type":"RasterFunctionVariable"
               },
               "NoDataRanges":{
                  "name":"NoDataRanges",
                  "isPublic":false,
                  "isDataset":false,
                  "value":[
                     
                  ],
                  "type":"RasterFunctionVariable"
               },
               "Table":{
                  "name":"Table",
                  "isPublic":false,
                  "isDataset":false,
                  "type":"RasterFunctionVariable"
               },
               "InputField":{
                  "name":"InputField",
                  "isPublic":false,
                  "isDataset":false,
                  "type":"RasterFunctionVariable"
               },
               "OutputField":{
                  "name":"OutputField",
                  "isPublic":false,
                  "isDataset":false,
                  "type":"RasterFunctionVariable"
               },
               "InputMaxField":{
                  "name":"InputMaxField",
                  "isPublic":false,
                  "isDataset":false,
                  "type":"RasterFunctionVariable"
               },
               "RemapTableType":{
                  "name":"RemapTableType",
                  "isPublic":false,
                  "isDataset":false,
                  "value":1,
                  "type":"RasterFunctionVariable"
               },
               "AllowUnmatched":{
                  "name":"AllowUnmatched",
                  "isPublic":false,
                  "isDataset":false,
                  "value":false,
                  "type":"RasterFunctionVariable"
               },
               "ReplacementValue":{
                  "name":"ReplacementValue",
                  "isPublic":false,
                  "isDataset":false,
                  "type":"RasterFunctionVariable"
               },
               "type":"RemapFunctionArguments"
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

		const serviceName = 'Landsat_Level2_Remap_' + (Math.random() * 1000).toFixed(0);
		const createServiceResponse = await createHostedImageryService(serviceName, token)
		// console.log(createServiceResponse)

		const remapNewJobRes = await submitNewJob({
			createServiceResponse,
			token
		})
		console.log('remapNewJobRes', remapNewJobRes)

		const checkJobStatusRes = await checkJobStatus(remapNewJobRes.jobId, token);
		console.log('checkJobStatusRes', checkJobStatusRes)

	} catch (err) {
		console.log(err);
	}
}

start();