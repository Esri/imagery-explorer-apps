# End-to-End Testing for Sentinel-2 Land Cover Explorer App
End-to-end tests for the Sentinel-2 Land Cover Explorer verify the functionality and reliability of key features.

## Running the Tests

- To run all tests, use:
    ```bash
    npm run e2e:landcover
    ```

- To run tests in headed mode:
    ```bash
    npm run e2e:landcover:headed
    ```

- To run a specific test file:
    ```bash
    npx playwright test e2e/landcover/tests/{file-name} --config e2e/playwright.landcover.config.ts --headed --workers=1
    ```

## Test Classification List 

### Running the test
To run the "Classification List" test:
```bash
npx playwright test e2e/landcover/tests/ClassificationList.test.ts --config e2e/playwright.landcover.config.ts --headed --workers=1
```
### Test Steps
1. Verify the classification list is visible.
2. Locate the "Trees" classification item and ensure it is visible.
3. Click the "Trees" classification item.
4. Verify the "Trees" item is highlighted as selected.
5. Verify the Land Cover layer is updated to show only the "Trees" class.
6. Click the "Trees" classification item again to unselect it.
7. Confirm the "Trees" item is no longer selected.


## Test Map Popup 

### Run the Test
To run the "Map Popup" test:
```bash
npx playwright test e2e/landcover/tests/MapPopup.test.ts --config e2e/playwright.landcover.config.ts --headed --workers=1
```
### Test Steps
1. Click on the map at a specific location.
2. Confirm that a popup appears at the clicked location.
3. Verify the popup displays a list of land cover classes for each year.


## Test Land Cover Layer

### Running the Land Cover Layer Test

To run the "Land Cover Layer" test:
```bash
npx playwright test e2e/landcover/tests/LandCoverLayer.test.ts --config e2e/playwright.landcover.config.ts --headed --workers=1
```

### Test Steps

1. Open Animate Mode.
2. Ensure the Land Cover layer is visible.
3. Use the Time Slider to change the year.
4. Confirm the Land Cover layer updates correctly.


## Test Download Panel

The "Download Panel" test verifies that users can access and interact with the download functionality for GeoTIFF files. It checks the visibility and operation of the download panel, confirms the presence and correctness of bulk download links for multiple years, ensures the LULC Footprints layer is displayed, and validates that popups provide accurate download links for selected locations.

### Running the Download Panel Test
To run the "Download Panel" test:
```bash
npx playwright test e2e/landcover/tests/DownloadPanel.test.ts --config e2e/playwright.landcover.config.ts --headed --workers=1
```

### Test Steps
1. Open the app and navigate to the map view.
2. Confirm the "Download GeoTIFF" button is visible and enabled.
3. Click the "Download GeoTIFF" button.
4. Verify the download panel appears.
5. Check that bulk download links for years 2017 to 2024 are present, each with the correct label and link.
6. Ensure the LULC Footprints layer is visible on the map.
7. Click on the map at a sample location within the download panel.
8. Confirm a popup appears showing download links for each year.
9. Verify each popup link is labeled with the correct year and points to the expected file.