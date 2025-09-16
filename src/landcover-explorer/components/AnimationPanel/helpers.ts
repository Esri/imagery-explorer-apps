/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';
import { convertCanvas2HtmlImageElement } from '@shared/utils/snippets/convertCanvas2HtmlImageElement';
import WebMap from '@arcgis/core/WebMap';
import MediaLayer from '@arcgis/core/layers/MediaLayer';
import { whenOnce, once, when } from '@arcgis/core/core/reactiveUtils';
import { delay } from '@shared/utils/snippets/delay';
import {
    getBasemapLayers,
    getMapLabelLayers,
    getTerrainLayer,
} from '@shared/components/MapView/ReferenceLayers';
import MapView from '@arcgis/core/views/MapView';
import { getHillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';

type GetScreenshotOfBasemapLayersParams = {
    mapView: MapView;
    webmapId: string;
    /**
     * Whether to include basemap layers in the screenshot.
     */
    includeBasemapInScreenshot: boolean;
    /**
     * Whether to include terrain layer in the screenshot.
     */
    includeTerrainInScreenshot: boolean;
    /**
     * Whether to include map label layers in the screenshot.
     */
    includeMapLabelsInScreenshot: boolean;
};

type GetScreenshotOfBasemapLayersOutput = {
    basemapScreenshot: __esri.Screenshot | null;
    hillshadeScreenshot: __esri.Screenshot | null;
    referenceLayersScreenshot: __esri.Screenshot | null;
};

/**
 * Combines a media layer image (such as a landcover or satellite layer) with optional map screenshots
 * (basemap, map labels, and hillshade) into a single HTMLImageElement using canvas compositing.
 *
 * The function supports blending the media layer with the basemap using a multiply blend mode,
 * which is useful for landcover layers but should be avoided for satellite imagery to prevent unwanted mixing.
 * Hillshade and map label screenshots can also be composited on top using appropriate blend modes.
 *
 * @param params - An object containing the following properties:
 * @param params.animationFrameImageUrl - The URL of the media layer image to load and combine.
 * @param params.basemapScreenshotData - Optional ImageData for the basemap screenshot to be drawn first.
 * @param params.mapLabelScreenshotData - Optional ImageData for map labels to be drawn last.
 * @param params.hillshadeScreenshotData - Optional ImageData for hillshade to be blended with the result.
 * @param params.shouldBlendMediaLayerElementWithBasemap - If true, blends the media layer with the basemap using 'multiply'.
 *
 * @returns A Promise that resolves to an HTMLImageElement containing the combined image.
 */
export const combineAnimationFrameImageWithMapScreenshots = async ({
    animationFrameImageUrl,
    basemapScreenshotData,
    mapLabelScreenshotData,
    hillshadeScreenshotData,
    shouldBlendMediaLayerElementWithBasemap,
}: {
    animationFrameImageUrl: string;
    basemapScreenshotData: ImageData | null;
    mapLabelScreenshotData: ImageData | null;
    hillshadeScreenshotData: ImageData | null;
    /**
     * If true, blend the media layer element with the basemap screenshot using a multiply blend mode.
     * This should only be done when the media layer element is a landcover layer. We should not blend the satellite imagery layer with the basemap
     * as it will make the satellite imagery mixed up with the basemap.
     */
    shouldBlendMediaLayerElementWithBasemap: boolean;
}): Promise<HTMLImageElement> => {
    // Load the animation frame image to be combined with map screenshots as an HTML Image Element
    const animationFrameImage = await loadImageAsHTMLIMageElement(
        animationFrameImageUrl
    );

    // Create a new canvas to combine the imageData and the HTMLImageElement
    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');

    // Set the dimensions of the new canvas to accommodate both the image and the imageData
    combinedCanvas.width = Math.max(
        combinedCanvas.width,
        animationFrameImage.width
    );
    combinedCanvas.height = Math.max(
        combinedCanvas.height,
        animationFrameImage.height
    );

    // make it brighter
    combinedCtx.filter = 'brightness(1.1)';

    // Draw the basemap screenshot data onto the canvas first
    if (basemapScreenshotData) {
        // convert ImageData to Bitmap and draw it on the combined canvas
        const basemapScreenshotBitmap = await createImageBitmap(
            basemapScreenshotData
        );

        combinedCtx.drawImage(basemapScreenshotBitmap, 0, 0);
    }

    // Draw the media layer image onto the canvas on top of the basemap screenshot
    if (animationFrameImage) {
        // console.log('blendModeTomediaLayerElement', blendModeTomediaLayerElement);
        if (shouldBlendMediaLayerElementWithBasemap) {
            combinedCtx.globalCompositeOperation = 'multiply';
        }

        combinedCtx.drawImage(animationFrameImage, 0, 0);
    }

    if (hillshadeScreenshotData) {
        // convert ImageData to Bitmap and draw it on the combined canvas
        const hillshadeScreenshotBitmap = await createImageBitmap(
            hillshadeScreenshotData
        );

        // Set the globalCompositeOperation to the desired blend mode
        combinedCtx.globalCompositeOperation = 'multiply';

        combinedCtx.drawImage(hillshadeScreenshotBitmap, 0, 0);
    }

    // Draw the map label screenshot data onto the new canvas last
    if (mapLabelScreenshotData) {
        // reset the globalCompositeOperation to default value 'source-over' before drawing map label screenshot
        combinedCtx.globalCompositeOperation = 'source-over';

        const mapLabelScreenshotBitmap = await createImageBitmap(
            mapLabelScreenshotData
        );

        combinedCtx.drawImage(mapLabelScreenshotBitmap, 0, 0);
    }

    // Convert the combined canvas to an HTMLImageElement
    const outputImage = await convertCanvas2HtmlImageElement(combinedCanvas);

    return outputImage;
};

/**
 * Captures screenshots of different basemap layers (basemap, map labels, terrain/hillshade) from an offscreen ArcGIS MapView.
 *
 * This function creates an offscreen map view that mirrors the current map view's state, toggles the visibility of basemap, label, and terrain layers
 * according to the provided options, and captures screenshots for each requested layer type.
 * The offscreen map view is destroyed and removed from the DOM after screenshots are taken.
 *
 * @param params - The parameters for capturing screenshots.
 * @param params.mapView - The current MapView instance to mirror.
 * @param params.webmapId - The ID of the WebMap to load in the offscreen view.
 * @param params.includeBasemapInScreenshot - Whether to include a screenshot of the basemap layers.
 * @param params.includeTerrainInScreenshot - Whether to include a screenshot of the terrain (hillshade) layer.
 * @param params.includeMapLabelsInScreenshot - Whether to include a screenshot of the map label layers.
 * @returns A promise that resolves to an object containing the screenshots for the basemap, reference (label) layers, and hillshade (terrain) layers.
 *
 * @remarks
 * - The function manipulates layer visibility to isolate each requested layer type for screenshotting.
 * - Screenshots are taken only for the layers specified in the input options.
 * - The function ensures the offscreen map is fully rendered before capturing each screenshot.
 * - The offscreen map view and its container are cleaned up after use.
 */
export const getScreenshotOfBasemapLayers = async ({
    mapView,
    webmapId,
    includeBasemapInScreenshot,
    includeTerrainInScreenshot,
    includeMapLabelsInScreenshot,
}: GetScreenshotOfBasemapLayersParams): Promise<GetScreenshotOfBasemapLayersOutput> => {
    if (!mapView) {
        return {
            basemapScreenshot: null,
            referenceLayersScreenshot: null,
            hillshadeScreenshot: null,
        };
    }

    let basemapScreenshot: __esri.Screenshot | null = null;
    let referenceLayersScreenshot: __esri.Screenshot | null = null;
    let hillshadeScreenshot: __esri.Screenshot | null = null;

    const containerDivId = 'offscreen-map-container';

    const container4OffscreenMap = document.createElement('div');

    // create a container div for the offscreen map view with the same size as the original map view
    // const container4OffscreenMap = document.createElement('div');
    container4OffscreenMap.id = containerDivId;
    container4OffscreenMap.style.width = mapView.container.clientWidth + 'px';
    container4OffscreenMap.style.height = mapView.container.clientHeight + 'px';
    container4OffscreenMap.style.position = 'absolute';
    container4OffscreenMap.style.top = '-9999px'; // position it offscreen
    container4OffscreenMap.style.left = '-9999px'; // position it offscreen

    // container4OffscreenMap.style.zIndex = '100'; // for debugging
    // container4OffscreenMap.style.border = '2px solid red'; // for debugging

    document.body.appendChild(container4OffscreenMap);

    const offscreenMapView = new MapView({
        map: new WebMap({
            portalItem: {
                id: webmapId,
            },
        }),
        container: container4OffscreenMap,
        center: mapView.center,
        zoom: mapView.zoom,
        constraints: mapView.constraints,
        popupEnabled: false,
        // scale: mapView.scale,
        // extent: mapView.extent,
        ui: {
            components: [],
        },
    });

    // add hillshade layer to the offscreen map view to capture terrain effect in the screenshot
    const hillshadeLayer = getHillshadeLayer(true);
    offscreenMapView.map.add(hillshadeLayer);

    // wait for the offscreen map view to be ready
    await offscreenMapView.when();

    // get basemap layers from the offscreen map view
    const basemapLayers = getBasemapLayers(offscreenMapView);

    // get map label layers from the offscreen map view
    const mapLabelLayer = getMapLabelLayers(offscreenMapView);

    // take a screenshot of the offscreen map view without map label layers
    // only if the user choose to include basemap or terrain in the screenshot
    if (includeBasemapInScreenshot) {
        // trun off all map label layers
        for (const layer of mapLabelLayer) {
            layer.visible = false;
        }

        // turn off terrain layer
        hillshadeLayer.visible = false;

        // turn on all basemap layers
        for (const layer of basemapLayers) {
            layer.visible = true;
        }

        await once(() => offscreenMapView.updating === false);

        await delay(100); // wait a bit more to ensure the map is fully rendered

        // take a screenshot of the offscreen map view without map label layers
        basemapScreenshot = await offscreenMapView.takeScreenshot({
            format: 'png',
            // quality: 80
            // quality: .8
        });
        // console.log(
        //     'screenshot captured from offscreen map',
        //     basemapScreenshot
        // );
    }

    // take a screenshot of the offscreen map view with only map label layers visible
    if (includeMapLabelsInScreenshot) {
        for (const layer of basemapLayers) {
            layer.visible = false;
        }

        hillshadeLayer.visible = false;

        // turn on map label layers and turn off basemap layers and terrain layer
        for (const layer of mapLabelLayer) {
            layer.visible = true;
        }

        await once(() => offscreenMapView.updating === false);

        await delay(100); // wait a bit more to ensure the map is fully rendered

        // take a screenshot of the offscreen map view with only reference layers visible
        referenceLayersScreenshot = await offscreenMapView.takeScreenshot({
            format: 'png',
            ignoreBackground: true,
            // quality: 80
            // quality: .8
        });

        // console.log(
        //     'screenshot with reference layers captured from offscreen map',
        //     referenceLayersScreenshot
        // );
    }

    if (includeTerrainInScreenshot) {
        // turn on map label layers and turn off basemap layers and terrain layer
        for (const layer of mapLabelLayer) {
            layer.visible = false;
        }

        for (const layer of basemapLayers) {
            layer.visible = false;
        }

        hillshadeLayer.visible = true;

        await once(() => offscreenMapView.updating === false);

        await delay(100); // wait a bit more to ensure the map is fully rendered

        // take a screenshot of the offscreen map view with only reference layers visible
        hillshadeScreenshot = await offscreenMapView.takeScreenshot({
            format: 'png',
            ignoreBackground: true,
            // quality: 80
            // quality: .8
        });

        // const blob = await imageDataToBlob(hillshadeScreenshot.data);
        // downloadBlob(blob, 'hillshade-screenshot.png');
    }

    // clean up the offscreen map view and its container
    offscreenMapView.destroy();

    document.body.removeChild(container4OffscreenMap);

    return {
        basemapScreenshot,
        referenceLayersScreenshot,
        hillshadeScreenshot,
    };
};
