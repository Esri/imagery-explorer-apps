import { test, expect, Page } from '@playwright/test';
import { 
    mockedQuerySentinel2ScenesResponse2024,
    mockedQuerySentinel2ScenesResponse2023
} from './mockedQuerySentinel2ScenesResponse';
import { mockedUserProfileResponseWithLicenseInfo } from './mockedUserProfileResponse';


/**
 * A map of features by their objectid for quick lookup.
 */
const mockedFeatureByObjectIdMap: Map<number, any> = new Map(
    [
        ...mockedQuerySentinel2ScenesResponse2023.features,
        ...mockedQuerySentinel2ScenesResponse2024.features
    ].map((feature) => [feature.attributes.objectid, feature])
);

/**
 * Mock the network requests for the Sentinel-2 Explorer app.
 * Using the mocked data to ensure the test is isolated and does not depend on live API responses.
 * @param page
 */
export const mockSentinel2NetworkRequests = async (page: Page) => {
    // Intercept and block the script
    await page.route('https://mtags.arcgis.com/tags-min.js', (route) =>
        route.abort()
    );

    // Mock the response for the Sentinel-2 scenes query
    await page.route(
        '*/**/Sentinel2L2A/ImageServer/query?**',
        async (route) => {
            const url = new URL(route.request().url());

            const whereClause = decodeURIComponent(
                url.searchParams.get('where') || ''
            );

            const objectIds = decodeURIComponent(
                url.searchParams.get('objectIds') || ''
            );

            const returnExtentOnly = decodeURIComponent(
                url.searchParams.get('returnExtentOnly') || ''
            );

            if( whereClause && whereClause.includes('2024')) {
                console.log('Mocked Sentinel-2 scenes query for 2024 intercepted');
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(mockedQuerySentinel2ScenesResponse2024),
                });

                return;
            }

            if (whereClause && whereClause.includes('2023')) {
                console.log('Mocked Sentinel-2 scenes query for 2023 intercepted');
                // Mock response for 2023 if needed
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(mockedQuerySentinel2ScenesResponse2023), // Empty response for 2023
                });

                return;
            }

            if(returnExtentOnly === 'true'){
                console.log('Mocked Sentinel-2 scenes query for extent only intercepted');
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        extent: {
                            xmin: -117.235,
                            ymin: 34.025,
                            xmax: -117.135,
                            ymax: 34.085,
                            spatialReference: { wkid: 4326 }
                        }
                    }),
                });
                return;
            }

            if( objectIds && mockedFeatureByObjectIdMap.has(+objectIds)) {
                console.log(`Mocked Sentinel-2 scenes query for objectid ${objectIds} intercepted`);
                const feature = mockedFeatureByObjectIdMap.get(+objectIds);
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        features: [{
                            ...feature,
                        }]
                    }),
                });

                return;
            }

            console.log('Mocked Sentinel-2 scenes query intercepted, but no conditions matched, passing through');
            // let it pass through if no conditions matched
            await route.continue();

            // // Mock response for other years or cases
            // await route.fulfill({
            //     status: 200,
            //     contentType: 'application/json',
            //     body: JSON.stringify({ features: [] }), // Empty response for 2023
            // });

        }
    );

    await page.route(
        '*/**/sharing/rest/content/users/*/addItem',
        async (route) => {
            console.log('Mocked addItem request intercepted');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: true,
                    id: 'mocked-item-id',
                    folder: '',
                }),
            });
        }
    );

    // Mock the response for the raster analysis cost estimation
    await page.route(
        '*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/EstimateRasterAnalysisCost/submitJob',
        async (route) => {
            console.log('Mocked EstimateRasterAnalysisCost submitJob request intercepted');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "jobId": "mocked-job-id",
                    "jobStatus":"esriJobNew"
                }),
            });
        }
    )

    // Mock the response for checking the job status for raster analysis cost estimation
    await page.route(
        '*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/EstimateRasterAnalysisCost/jobs/*?**',
        async (route) => {
            console.log('Mocked EstimateRasterAnalysisCost job status request intercepted');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "jobId": "mocked-job-id",
                    "jobStatus":"esriJobSucceeded",
                    "messages": [],
                    "results": {
                        "outCost": {
                            "paramUrl": "results/outCost",
                        }
                    }
                }),
            });
        }   
    );

    // Mock the response for getting the result of raster analysis cost estimation
    await page.route(
        '*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/EstimateRasterAnalysisCost/jobs/*/results/outCost?**',
        async (route) => {
            console.log('Mocked outCost request intercepted');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "paramName":"outCost",
                    "dataType":"GPString",
                    "value":{
                        "credits": 6.66,
                    }
                }),
            });
        }   
    );

    // Mock the response for service name availability check
    await page.route(
        '*/**/sharing/rest/portals/*/isServiceNameAvailable?**',
        async (route) => {
            console.log('Mocked service name availability request intercepted');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    available: true,
                }),
            });
        }
    );

    // mock the response for check user profile and licenses
    await page.route(
        '*/**/sharing/rest/community/users/*?f=json&returnUserLicensedItems=true**',
        async (route) => {
            console.log('Mocked user profile request intercepted');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedUserProfileResponseWithLicenseInfo),
            });
        }
    );

    // Mock the response for creating a hosted imagery service
    // This happens after the check for service name availability and user license check
    await page.route(
        '*/**/sharing/rest/content/users/*/createService',
        async (route) => {
            console.log('Mocked createService request intercepted');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "encodedServiceURL": "https://service.arcgis.com/mockedOrg/arcgis/rest/services/mocked_Sentinel_2_Scene_service_name/ImageServer",
                    "itemId": "mocked-item-id",
                    "name": "mocked_Sentinel_2_Scene_service_name",
                    "serviceItemId": "mocked-item-id",
                    "serviceurl": "https://service.arcgis.com/mockedOrg/arcgis/rest/services/mocked_Sentinel_2_Scene_service_name/ImageServer",
                    "size": -1,
                    "success": true,
                    "type": "Image Service",
                    "typeKeywords": [
                        "Dynamic Imagery Layer"
                    ],
                    "isView": false
                }),
            });
        }
    )

    // Mocked response of update ArcGIS Online item info,
    // this happens after the hosted imagery service is created
    await page.route(
        '*/**/sharing/rest/content/users/*/items/*/update',
        async (route) => {
            console.log('Mocked update item request intercepted');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "success": true,
                    "id": "mocked-item-id",
                }),
            });
        }
    )

    // Mock the response for the raster generation job submission
    await page.route(
        '*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/GenerateRaster/submitJob',
        async (route) => {
            console.log('Mocked GenerateRaster submitJob request intercepted');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "jobId": "mocked-generate-raster-job-id",
                    "jobStatus":"esriJobNew"
                }),
            });
        }
    )   

    // Mock the response for checking the job status for raster generation
    await page.route(
        '*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/GenerateRaster/jobs/*?**',
        async (route) => {
            console.log('Mocked GenerateRaster job status request intercepted');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "jobId": "mocked-generate-raster-job-id",
                    "jobStatus":"esriJobSucceeded",
                    "messages": [],
                    "inputs":{
                        "outputType":{
                            "paramUrl":"inputs/outputType"
                        },
                        "rasterFunction":{
                            "paramUrl":"inputs/rasterFunction"
                        },
                        "OutputName":{
                            "paramUrl":"inputs/OutputName"
                        }
                    },
                    "results":{
                        "outputRaster":{"paramUrl":"results/outputRaster"}
                    }
                }),
            });
        }   
    );
};

export const resetMockSentinel2NetworkRequest = async (page: Page) => {
    await page.unroute('https://mtags.arcgis.com/tags-min.js');
    await page.unroute(
        '*/**/Sentinel2L2A/ImageServer/query?**'
    );
    await page.unroute(
        '*/**/sharing/rest/content/users/*/addItem'
    );
    await page.unroute(
        '*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/EstimateRasterAnalysisCost/submitJob'
    );
    await page.unroute(
        '*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/EstimateRasterAnalysisCost/jobs/*?**'
    );
    await page.unroute(
        '*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/EstimateRasterAnalysisCost/jobs/*/results/outCost?**'
    );
    await page.unroute(
        '*/**/sharing/rest/portals/*/isServiceNameAvailable?**'
    );
    await page.unroute(
        '*/**/sharing/rest/community/users/*?f=json&returnUserLicensedItems=true**'
    );
    await page.unroute(
        '*/**/sharing/rest/content/users/*/createService'
    );
    await page.unroute(
        '*/**/sharing/rest/content/users/*/items/*/update'
    );
    await page.unroute(
        '*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/GenerateRaster/submitJob'
    );
    await page.unroute(
        '*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/GenerateRaster/jobs/*?**'
    );
};