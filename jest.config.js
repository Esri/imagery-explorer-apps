// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    setupFiles: ['./jest.setup.js'],

    clearMocks: true,

    // // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],

    // // The directory where Jest should output its coverage files
    // coverageDirectory: 'coverage',

    // // An array of file extensions your modules use
    // moduleFileExtensions: ['js', 'json', 'jsx'],

    // // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // // The glob patterns Jest uses to detect test files
    // testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

    // // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    // testPathIgnorePatterns: ['\\\\node_modules\\\\'],
    testPathIgnorePatterns: ['/__jest_utils__/', 'e2e'],

    // // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    // testURL: 'http://localhost',

    // // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    // transformIgnorePatterns: ['<rootDir>/node_modules/'],

    // Indicates whether each individual test should be reported during the run
    verbose: true,

    moduleNameMapper: {
        '^@shared(.*)$': '<rootDir>/src/shared$1',
    },
    globals: {
        WEBPACK_DEFINED_APP_NAME: 'mocked-app-name',
        ENV_LANDSAT_EXPLORER_APP_ID: 'mock-landsat-explorer-app-id',
        ENV_LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL:
            'https://landsat-original.example.com',
        ENV_LANDSAT_LEVEL_2_PROXY_SERVICE_URL:
            'http://landsat-proxy.example.com',
        ENV_SENTINEL2_EXPLORER_APP_ID: 'mock-sentinel2-explorer-app-id',
        ENV_SENTINEL2_PROXY_SERVICE_URL: 'http://sentinel2-proxy.example.com',
        ENV_SENTINEL2_ORIGINAL_SERVICE_URL:
            'https://sentinel2-original.example.com',
        ENV_SENTINEL1_EXPLORER_APP_ID: 'mock-sentinel1-explorer-app-id',
        ENV_SENTINEL1_PROXY_SERVICE_URL: 'http://sentinel1-proxy.example.com',
        ENV_SENTINEL1_ORIGINAL_SERVICE_URL:
            'https://sentinel1-original.example.com',
        ENV_ARCGIS_PORTAL_ROOT_URL: 'https://www.arcgis.com',
        ENV_RASTER_ANALYSIS_ROOT_URL:
            'https://rasteranalysis.example.com/arcgis/rest/services/RasterAnalysisTools/GPServer',
        ENV_LANDCOVER_EXPLORER_APP_ID: 'mock-landcover-explorer-app-id',
        ENV_SENTINEL2_LANDCOVER_SERVICE_URL:
            'https://ic.example.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer',
        ENV_SENTINEL2_LANDCOVER_STATISTICS_SERVICE_URL:
            'https://ic.example.com/arcgis/rest/services/Sentinel2_10m_LandCover_Statistics/ImageServer',
        ENV_NLCD_LANDCOVER_EXPLORER_APP_ID:
            'mock-nlcd-landcover-explorer-app-id',
        ENV_NLCD_LANDCOVER_SERVICE_URL:
            'https://ic.example.com/arcgis/rest/services/NLCD_LandCover/ImageServer',
        ENV_WEB_MAP_ID: 'mock-web-map-id',
    },
};
