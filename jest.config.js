// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    setupFiles: ['./jest.setup.js'],
    
    // Automatically clear mock calls and instances between every test
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
        "^@shared(.*)$": "<rootDir>/src/shared$1",
    } ,
    globals: {
        "WEBPACK_DEFINED_APP_NAME": "landsat",
        LANDSAT_SERVICE_PROXY_URL_DEV: "http://localhost:3000/landsat-dev",
        LANDSAT_SERVICE_PROXY_URL_PROD: "https://api.example.com/landsat-prod",
        SENTINEL2_SERVICE_PROXY_URL_DEV: "http://localhost:3000/sentinel2-dev",
        SENTINEL2_SERVICE_PROXY_URL_PROD: "https://api.example.com/sentinel2-prod",
        SENTINEL1_SERVICE_PROXY_URL_DEV: "http://localhost:3000/sentinel1-dev",
        SENTINEL1_SERVICE_PROXY_URL_PROD: "https://api.example.com/sentinel1-prod"
    }
};