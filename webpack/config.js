
/**
 * Entry point file paths by application. 
 * The keys are application names that should match keys in src/config.json.
 */
const ENTRY_POINTS_BY_APP_NAME = {
    'landsatexplorer': './src/landsat-explorer/index.tsx',
    'landcoverexplorer': "/src/landcover-explorer/index.tsx",
    'sentinel1explorer': "/src/sentinel-1-explorer/index.tsx",
    'sentinel2explorer': "/src/sentinel-2-explorer/index.tsx",
    'spectralsampler': "/src/spectral-sampling-tool/index.tsx",
    'surfacetemperature': "/src/surface-temp/index.tsx",
    "nlcdlandcoverexplorer": "/src/nlcd-landcover-explorer/index.tsx",
};

/**
 * environment variables by application. 
 * The keys are application names that should match keys in src/config.json.
 */
const ENV_VARIABLES_BY_APP_NAME = {
    'landsatexplorer': [
        {
            name: 'LANDSAT_EXPLORER_APP_ID',
            required: true
        },
        {
            name: 'LANDSAT_LEVEL_2_PROXY_SERVICE_URL',
            required: true
        }
    ],
    'landcoverexplorer': [
        {
            name: 'LANDCOVER_EXPLORER_APP_ID',
            required: true
        },
        {
            name: 'SENTINEL2_PROXY_SERVICE_URL',
            required: true
        }
    ],
    'sentinel1explorer': [
        {
            name: 'SENTINEL1_EXPLORER_APP_ID',
            required: true
        },
        {
            name: 'SENTINEL1_PROXY_SERVICE_URL',
            required: true
        }
    ],
    'sentinel2explorer': [
        {
            name: 'SENTINEL2_EXPLORER_APP_ID',
            required: true
        },
        {
            name: 'SENTINEL2_PROXY_SERVICE_URL',
            required: true
        }
    ],
    'spectralsampler': [
        {
            name: 'LANDSAT_LEVEL_2_PROXY_SERVICE_URL',
            required: true
        },
        {
            name: 'SENTINEL2_PROXY_SERVICE_URL',
            required: true
        }
    ],
    'surfacetemperature': [
        {
            name: 'SUREFACE_TEMP_EXPLORER_APP_ID',
            required: true
        },
        {
            name: 'LANDSAT_LEVEL_2_PROXY_SERVICE_URL',
            required: true
        }
    ],
    'nlcdlandcoverexplorer': [
        {
            name: 'NLCD_LANDCOVER_EXPLORER_APP_ID',
            required: true
        },
        {
            name: 'LANDSAT_LEVEL_2_PROXY_SERVICE_URL',
            required: true
        }
    ]
}

module.exports = {
    ENTRY_POINTS_BY_APP_NAME,
    ENV_VARIABLES_BY_APP_NAME
};