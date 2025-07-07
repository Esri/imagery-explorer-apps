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