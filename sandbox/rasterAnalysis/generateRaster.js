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
		"latestWkid": 3857,
		"xyTolerance": 0.001,
		"zTolerance": 0.001,
		"mTolerance": 0.001,
		"falseX": -20037700,
		"falseY": -30241100,
		"xyUnits": 10000,
		"falseZ": -100000,
		"zUnits": 10000,
		"falseM": -100000,
		"mUnits": 10000
	}
}

const EXTENT_OF_CLIPPING_GEOM = {
	"xmin": -13177316.908500001,
	"ymin": 3779150.445600003,
	"xmax": -12908191.6368,
	"ymax": 4058763.9095999971,
	"spatialReference": {
		"wkid": 102100,
		"latestWkid": 3857,
		"xyTolerance": 0.001,
		"zTolerance": 0.001,
		"mTolerance": 0.001,
		"falseX": -20037700,
		"falseY": -30241100,
		"xyUnits": 10000,
		"falseZ": -100000,
		"zUnits": 10000,
		"falseM": -100000,
		"mUnits": 10000
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

	const params = new URLSearchParams({
		f: "json",
		token,
		outputType: 'dynamicLayer',
		rasterFunction: JSON.stringify({
			"rasterFunction": "Clip",
			"rasterFunctionArguments": {
				"ClippingType": "1",
				"ClippingGeometry": CLIPPING_GEOM,
				// "clippingMethod": "byExtent",
				"valueLayer": {
					"url": `https://landsatdev.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer?token=${token}`,
					"name": "LandsatC2L2",
					// "renderingRule":{
					//     "rasterFunction":"Natural Color with DRA"
					// },
					"mosaicRule": {
						"ascending": false,
						"lockRasterIds": [OBJECTID],
						"mosaicMethod": "esriMosaicLockRaster",
						"where": `objectid in (${OBJECTID})`
					}
				}
			}
		}),
		functionArguments: JSON.stringify({
			"raster": {
				"url": `https://landsatdev.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer?token=${token}`,
				"name": "LandsatC2L2",
				// "renderingRule": {
				//     "rasterFunction": "Natural Color with DRA"
				// },
				"mosaicRule": {
					"ascending": false,
					"lockRasterIds": [OBJECTID],
					"mosaicMethod": "esriMosaicLockRaster",
					"where": `objectid in (${OBJECTID})`
				}
			}
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
		context: JSON.stringify({
			"geometry": CLIPPING_GEOM
		})
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

/**
 * 
 * @param {*} jobId 
 * @param {*} token 
 * @returns 
 * 
 * example of response:
 * ```js
 * {
    "jobId": "11cba2e5eb994caab277f3df887044c6",
    "jobStatus": "esriJobSucceeded",
    "inputs": {
        "rasterFunction": {
        "paramUrl": "inputs/rasterFunction"
        },
        "functionArguments": {
        "paramUrl": "inputs/functionArguments"
        },
        "OutputName": {
        "paramUrl": "inputs/OutputName"
        },
        "context": {
        "paramUrl": "inputs/context"
        },
        "outputType": {
        "paramUrl": "inputs/outputType"
        }
    },
    "results": {
        "outputRaster": {
        "paramUrl": "results/outputRaster"
        }
    },
    "messages": [
        {
        "type": "esriJobMessageTypeWarning",
        "description": "{\"cost\": 1}"
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "Raster Analysis Privilege Check: OK"
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "Output item id is: 7eeab16829b44ebe8ed707c38fda37f0"
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "Output image service url is: https://iservicesdev.arcgis.com/LkFyxb9zDq7vAOAm/arcgis/rest/services/Data_extracted_from_LandsatC2L2_202410151433/ImageServer"
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "Output cloud raster name is: /cloudStores/LkFyxb9zDq7vAOAm/7eeab16829b44ebe8ed707c38fda37f0/Data_extracted_from_LandsatC2L2_202410151433.crf"
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "{\"rasterFunction\":\"Clip\",\"rasterFunctionArguments\":{\"ClippingType\":\"1\",\"ClippingGeometry\":{\"xmin\":-12583429.576139491,\"ymin\":3900032.88035888,\"xmax\":-12545688.793423735,\"ymax\":3910963.375403645,\"spatialReference\":{\"wkid\":102100,\"latestWkid\":3857,\"xyTolerance\":0.001,\"zTolerance\":0.001,\"mTolerance\":0.001,\"falseX\":-20037700,\"falseY\":-30241100,\"xyUnits\":10000,\"falseZ\":-100000,\"zUnits\":10000,\"falseM\":-100000,\"mUnits\":10000}},\"clippingMethod\":\"byExtent\",\"valueLayer\":\"{\\\"url\\\":\\\"https://iservicesdev1-eu1.arcgis.com/03e6LFX6hxm1ywlK/arcgis/rest/services/LivingAtlas_Landsat_OLI_TM_ETM/ImageServer?token=9RK8DY0qvaqYcPFrrqGyoc_Hw2w_BiuUfWSbVAwTisP5_rcoZesuFjwM_Y5mRo0ow_UCCbyhr3VWNLAkFpt5nzI9bPiHwNLMPXPn-qiJHI-3m-KbrzYtpMR_iEAHRn91mjvRrRajjv-EGAQm7dFR0QFpPaP85n9we1PpGcGhCBOht33KoRjQw3kjxruAO5LkTc_i_vLJvUb0dD7MMfHLLo5ja5-Tzuvru43LME6EO1HSRngkywAlngUor66va9byjY8C4BMwCRXOHpZIdmWgiII2OGOaIW8lGjR9ZPhw6f4lLmmM84O8849dDcKxU_OB\\\",\\\"name\\\":\\\"LandsatC2L2\\\",\\\"renderingRule\\\":{\\\"rasterFunction\\\":\\\"Natural Color with DRA\\\"},\\\"mosaicRule\\\":{\\\"mosaicMethod\\\":\\\"esriMosaicAttribute\\\",\\\"sortField\\\":\\\"best\\\",\\\"sortValue\\\":\\\"0\\\",\\\"ascending\\\":true,\\\"mosaicOperation\\\":\\\"MT_FIRST\\\"}}\"}}"
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "/cloudStores/LkFyxb9zDq7vAOAm/7eeab16829b44ebe8ed707c38fda37f0/Data_extracted_from_LandsatC2L2_202410151433.crf"
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "raster '{\"url\": \"https://iservicesdev1-eu1.arcgis.com/03e6LFX6hxm1ywlK/arcgis/rest/services/LivingAtlas_Landsat_OLI_TM_ETM/ImageServer?token=9RK8DY0qvaqYcPFrrqGyoc_Hw2w_BiuUfWSbVAwTisP5_rcoZesuFjwM_Y5mRo0ow_UCCbyhr3VWNLAkFpt5nzI9bPiHwNLMPXPn-qiJHI-3m-KbrzYtpMR_iEAHRn91mjvRrRajjv-EGAQm7dFR0QFpPaP85n9we1PpGcGhCBOht33KoRjQw3kjxruAO5LkTc_i_vLJvUb0dD7MMfHLLo5ja5-Tzuvru43LME6EO1HSRngkywAlngUor66va9byjY8C4BMwCRXOHpZIdmWgiII2OGOaIW8lGjR9ZPhw6f4lLmmM84O8849dDcKxU_OB\", \"name\": \"LandsatC2L2\", \"renderingRule\": {\"rasterFunction\": \"Natural Color with DRA\"}, \"mosaicRule\": {\"mosaicMethod\": \"esriMosaicAttribute\", \"sortField\": \"best\", \"sortValue\": \"0\", \"ascending\": true, \"mosaicOperation\": \"MT_FIRST\"}}'"
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "Updating service with data store URI."
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "Getting image service info..."
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "Updating service: https://iservicesdev.arcgis.com/LkFyxb9zDq7vAOAm/arcgis/rest/admin/services/Data_extracted_from_LandsatC2L2_202410151433/ImageServer/edit"
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "Update item service: https://iservicesdev.arcgis.com/LkFyxb9zDq7vAOAm/arcgis/rest/admin/services/Data_extracted_from_LandsatC2L2_202410151433/ImageServer successfully."
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "Portal item refreshed."
        },
        {
        "type": "esriJobMessageTypeInformative",
        "description": "Succeeded at Tuesday, October 15, 2024 9:36:17 PM (Elapsed Time: 58.13 seconds)"
        }
    ]
    }
  ```
 */
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

		const serviceName = 'Landsat_Level2_' + (Math.random() * 1000).toFixed(0);
		const createServiceResponse = await createHostedImageryService(serviceName, token)
		// console.log(createServiceResponse)

		const generateRasterNewJobRes = await submitNewJob({
			createServiceResponse,
			token
		})
		console.log('generateRasterNewJobRes', generateRasterNewJobRes)

		const checkJobStatusRes = await checkJobStatus(generateRasterNewJobRes.jobId, token);
		console.log('checkJobStatusRes', checkJobStatusRes)

	} catch (err) {
		console.log(err);
	}
}

start();