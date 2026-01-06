# End-to-End Testing for Imagery Explorer Apps

End-to-end tests for the Imagery Explorer Apps. These tests use Playwright to automate browser interactions and verify application functionality.

## Prerequisites

Update the `.env.e2e` file in project root with these variables.

```sh
# Required: ArcGIS Online username for E2E tests
E2E_TEST_ARCGIS_ONLINE_USERNAME = your_username_here

# Required: ArcGIS Online password for E2E tests
E2E_TEST_ARCGIS_ONLINE_PASSWORD = your_password_here

# OPtional: Specify the hostname used by the Webpack development server.
# This value is utilized in end-to-end tests to connect to the development server.
# Ensure it matches the dev server host configuration in `webpack.config.js`.
# If not set, defaults to 'http://localhost:8080'.
WEBPACK_DEV_SERVER_HOSTNAME = custom.hostname.here
```

## E2E Tests for Sentinel-2 Explorer App

To run the end-to-end tests for the Sentinel-2 Explorer App, use the following command:

```sh
npm run e2e:sentinel2
```

To run the tests in a headed mode, use the following command:

```sh
npm run e2e:sentinel2:headed
```

To run a specific test file, use the following command:

```sh
npx playwright test e2e/sentinel2/tests/{file-name} --config e2e/playwright.sentinel2.config.ts --headed --workers=1
```

The detailed instructions and test cases can be found in the [Sentinel-2 Explorer E2E Tests Documentation](./sentinel2/README.md).

## E2E Tests for Sentinel-2 Landcover App

To run the end-to-end tests for the Sentinel-2 Landcover App, use the following command:

- To run all tests, use:

```sh
npm run e2e:landcover
```

- To run tests in headed mode:

```sh
npm run e2e:landcover:headed
```

- To run a specific test file:

```sh
npx playwright test e2e/landcover/tests/{file-name} --config e2e/playwright.landcover.config.ts --headed --workers=1
```

The detailed instructions and test cases can be found in the [Sentinel-2 Landcover E2E Tests Documentation](./landcover/README.md).
