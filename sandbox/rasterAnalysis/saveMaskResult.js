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


const OBJECTID = 9445689;

const CLIPPING_GEOM = {
	"rings": [
		[
			[
				-13126451.3033000007,
				4058763.9095999971
			],
			[
				-12908191.6368,
				4007893.42949999869
			],
			[
				-12963104.7622,
				3779150.445600003
			],
			[
				-13177316.9085000008,
				3829010.012000002
			],
			[
				-13126451.3033000007,
				4058763.9095999971
			]
		]
	],
	"spatialReference": {
		"wkid": 102100,
		"latestWkid": 3857
	}
}

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
			"name": "Remap",
			"description": "Changes pixel values by assigning new values to ranges of pixel values or using an external table.",
			"function": {
				"type": "RemapFunction",
				"pixelType": "UNKNOWN",
				"name": "Remap",
				"description": "Changes pixel values by assigning new values to ranges of pixel values or using an external table."
			},
			"arguments": {
				"Raster": {
					"name": "Band Arithmetic",
					"description": "Calculates indexes using predefined formulas or a user-defined expression.",
					"function": {
						"type": "BandArithmeticFunction",
						"pixelType": "UNKNOWN",
						"name": "Band Arithmetic",
						"description": "Calculates indexes using predefined formulas or a user-defined expression."
					},
					"arguments": {
						"Raster": {
							"name": "Clip",
							"description": "Sets the extent of a raster using coordinates or another dataset.",
							"function": {
								"type": "ClipFunction",
								"pixelType": "UNKNOWN",
								"name": "Clip",
								"description": "Sets the extent of a raster using coordinates or another dataset."
							},
							"arguments": {
								"Raster": {
									"name": "Raster",
									"isPublic": false,
									"isDataset": true,
									"value": {
										"url": `https://landsatdev.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer?token=${token}`,
										"name": "LandsatC2L2",
										"mosaicRule": {
											"ascending": false,
											"lockRasterIds": [OBJECTID],
											"mosaicMethod": "esriMosaicLockRaster",
											"where": `objectid in (${OBJECTID})`
										}
									},
									"type": "RasterFunctionVariable"
								},
								"ClippingType": {
									"name": "ClippingType",
									"isPublic": false,
									"isDataset": false,
									"value": 1,
									"type": "RasterFunctionVariable"
								},
								"ClippingRaster": {
									"name": "ClippingRaster",
									"isPublic": false,
									"isDataset": true,
									"type": "RasterFunctionVariable"
								},
								"ClippingGeometry": {
									"name": "ClippingGeometry",
									"isPublic": false,
									"isDataset": false,
									"value": CLIPPING_GEOM,
									"type": "RasterFunctionVariable"
								},
								//   "Extent": {
								// 	"name": "Extent",
								// 	"isPublic": false,
								// 	"isDataset": false,
								// 	"value": EXTENT_OF_CLIPPING_GEOM,
								// 	"type": "RasterFunctionVariable"
								//   },
								"UseInputFeatureGeometry": {
									"name": "UseInputFeatureGeometry",
									"isPublic": false,
									"isDataset": false,
									"type": "RasterFunctionVariable"
								},
								"type": "ClipFunctionArguments"
							},
							"functionType": 0,
							"thumbnail": "",
							"thumbnailEx": "",
							"help": ""
						},
						"Method": {
							"name": "Method",
							"isPublic": false,
							"isDataset": false,
							"value": 0,
							"type": "RasterFunctionVariable"
						},
						"BandIndexes": {
							"name": "BandIndexes",
							"isPublic": false,
							"isDataset": false,
							"value": "(B3-B6)/(B3+B6)",
							"type": "RasterFunctionVariable"
						},
						"type": "BandArithmeticFunctionArguments"
					},
					"functionType": 0,
					"thumbnail": "",
					"thumbnailEx": "",
					"help": ""
				},
				"UseTable": {
					"name": "UseTable",
					"isPublic": false,
					"isDataset": false,
					"value": false,
					"type": "RasterFunctionVariable"
				},
				"InputRanges": {
					"name": "InputRanges",
					"isPublic": false,
					"isDataset": false,
					"value": [
						0,
						1
					],
					"type": "RasterFunctionVariable"
				},
				"OutputValues": {
					"name": "OutputValues",
					"isPublic": false,
					"isDataset": false,
					"value": [
						1
					],
					"type": "RasterFunctionVariable"
				},
				"NoDataRanges": {
					"name": "NoDataRanges",
					"isPublic": false,
					"isDataset": false,
					"value": [

					],
					"type": "RasterFunctionVariable"
				},
				"Table": {
					"name": "Table",
					"isPublic": false,
					"isDataset": false,
					"type": "RasterFunctionVariable"
				},
				"InputField": {
					"name": "InputField",
					"isPublic": false,
					"isDataset": false,
					"type": "RasterFunctionVariable"
				},
				"OutputField": {
					"name": "OutputField",
					"isPublic": false,
					"isDataset": false,
					"type": "RasterFunctionVariable"
				},
				"InputMaxField": {
					"name": "InputMaxField",
					"isPublic": false,
					"isDataset": false,
					"type": "RasterFunctionVariable"
				},
				"RemapTableType": {
					"name": "RemapTableType",
					"isPublic": false,
					"isDataset": false,
					"value": 1,
					"type": "RasterFunctionVariable"
				},
				"AllowUnmatched": {
					"name": "AllowUnmatched",
					"isPublic": false,
					"isDataset": false,
					"value": false,
					"type": "RasterFunctionVariable"
				},
				"ReplacementValue": {
					"name": "ReplacementValue",
					"isPublic": false,
					"isDataset": false,
					"type": "RasterFunctionVariable"
				},
				"type": "RemapFunctionArguments"
			},
			"functionType": 0,
			"thumbnail": "",
			"thumbnailEx": "",
			"help": ""
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

		const serviceName = 'Landsat_Level2_Mask_Tool_Result_' + (Math.random() * 1000).toFixed(0);
		const createServiceResponse = await createHostedImageryService(serviceName, token)
		// console.log(createServiceResponse)

		const res = await submitNewJob({
			createServiceResponse,
			token
		})
		console.log('Mask_Tool_Result_Job_Response', res)

		const checkJobStatusRes = await checkJobStatus(res.jobId, token);
		console.log('checkJobStatusRes', checkJobStatusRes)

	} catch (err) {
		console.log(err);
	}
}

start();