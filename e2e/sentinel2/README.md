# End-to-End Testing for Sentinel-2 Explorer App
End-to-end tests for the Sentinel-2 Explorer App ensure the functionality and reliability of key features.

## Run the Tests
- To run the tests, use the following command:
```bash
npm run e2e:sentinel2
```

To run the tests in a headed mode, use the following command:
```bash
npm run e2e:sentinel2:headed
```

To run a specific test file, use the following command:
```bash
npx playwright test e2e/sentinel2/tests/{file-name} --config e2e/playwright.sentinel2.config.ts --headed --workers=1
```

## Test "Find a Scene" Mode

### Run the Test
To run the "Find a Scene" test, use the following command:
```bash 
npx playwright test e2e/sentinel2/tests/FindASceneMode.test.ts --config e2e/playwright.sentinel2.config.ts --headed --workers=1
```

### Test Steps
1. Navigate to the "Find a Scene" mode URL (e.g., `http://localhost:8080/#mode=find+a+scene`).
2. Verify the "Scene Selection" header is visible.
3. Confirm the calendar container is displayed.
4. Ensure the year selection dropdown is visible and initially set to "Past 12 Months".
5. Open the year selection dropdown and choose "2024".
6. Verify the dropdown updates to show "2024" as the selected year.
7. Check that the calendar displays January 2024.
8. Confirm calendar cells with available scenes (e.g., January 3, 2024) are visible.
9. Hover over a calendar cell and verify a tooltip appears.
10. Click a calendar cell and ensure the scene information table appears.
11. Verify the scene information table displays the correct acquisition date ("Jan 03, 2024").
12. Check that the acquisition date label is visible and has the correct attribute (`data-aququisition-date="2024-01-03"`).
13. Click the reset button and confirm the acquisition date label and scene information table are hidden.