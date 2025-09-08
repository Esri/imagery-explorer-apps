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

import ImageElement from '@arcgis/core/layers/support/ImageElement';
// import { appConfig } from '@shared/config';
// import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { selectMapCenter } from '@shared/store/Map/selectors';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
// import { AnimationFrameData4DownloadJob } from '@shared/components/AnimationDownloadPanel/DownloadPanel';
// import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { AnimationFrameData } from '@vannizhang/images-to-video-converter-client';
// import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';
import MapView from '@arcgis/core/views/MapView';
import {
    // combineLandcoverImageWithMapScreenshot,
    combineLandcoverImageWithMapScreenshots,
} from './helpers';
import {
    selectLandcoverAnimationYears,
    selectShouldShowSatelliteImageryLayer,
} from '@shared/store/LandcoverExplorer/selectors';
import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';
import { animationStatusChanged } from '@shared/store/UI/reducer';
import Map from '@arcgis/core/Map';
import WebMap from '@arcgis/core/WebMap';
import { appConfig } from '@shared/config';
import MediaLayer from '@arcgis/core/layers/MediaLayer';
import { whenOnce, once, when } from '@arcgis/core/core/reactiveUtils';
import { delay } from '@shared/utils/snippets/delay';
import {
    getBasemapLayers,
    getMapLabelLayers,
    getTerrainLayer,
} from '@shared/components/MapView/ReferenceLayers';

/**
 * Represents the properties required by the custom hook `useFrameDataForDownloadJob`.
 */
type Props = {
    /**
     * An array of ImageElement objects representing media layer elements.
     */
    mediaLayerElements: ImageElement[];
    /**
     * The animation metadata sources.
     */
    animationMetadataSources: string;
    mapView?: MapView;
};

const getScreenshotOfBasemapLayers = async (
    mapView: MapView,
    webmapId: string
): Promise<{
    basemapScreenshot: __esri.Screenshot | null;
    referenceLayersScreenshot: __esri.Screenshot | null;
}> => {
    if (!mapView) {
        return {
            basemapScreenshot: null,
            referenceLayersScreenshot: null,
        };
    }

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

    // wait for the offscreen map view to be ready
    await offscreenMapView.when();

    // get basemap layers from the offscreen map view
    const basemapLayers = getBasemapLayers(offscreenMapView);

    const mapLabelLayer = getMapLabelLayers(offscreenMapView);

    const terrainLayer = getTerrainLayer(offscreenMapView);

    // for(const layer of mapLabelLayer){
    //     layer.visible = false;
    // }

    // await once(() => offscreenMapView.updating === false);

    // trun off all map label layers
    for (const layer of mapLabelLayer) {
        layer.visible = false;
    }

    await once(() => offscreenMapView.updating === false);

    await delay(100); // wait a bit more to ensure the map is fully rendered

    // take a screenshot of the offscreen map view without map label layers
    const basemapScreenshot = await offscreenMapView.takeScreenshot({
        format: 'png',
        // quality: 80
        // quality: .8
    });
    console.log('screenshot captured from offscreen map', basemapScreenshot);

    // turn on map label layers and turn off basemap layers and terrain layer
    for (const layer of mapLabelLayer) {
        layer.visible = true;
    }

    for (const layer of basemapLayers) {
        layer.visible = false;
    }

    if (terrainLayer) {
        terrainLayer.visible = false;
    }

    await once(() => offscreenMapView.updating === false);

    await delay(100); // wait a bit more to ensure the map is fully rendered

    // take a screenshot of the offscreen map view with only reference layers visible
    const referenceLayersScreenshot = await offscreenMapView.takeScreenshot({
        format: 'png',
        ignoreBackground: true,
        // quality: 80
        // quality: .8
    });
    console.log(
        'screenshot with reference layers captured from offscreen map',
        referenceLayersScreenshot
    );

    // clean up the offscreen map view and its container
    offscreenMapView.destroy();

    document.body.removeChild(container4OffscreenMap);

    return {
        basemapScreenshot,
        referenceLayersScreenshot,
    };
};

/**
 * This custom hook returns an array of `AnimationFrameData4DownloadJob` objects that
 * can be used by the Animation Download task.
 * @param {Props} - The properties required by the hook.
 * @returns An array of `AnimationFrameData4DownloadJob` objects.
 */
export const useFrameDataForDownloadJobViaMapScreenshot = ({
    mediaLayerElements,
    mapView,
    animationMetadataSources,
}: Props) => {
    const dispatch = useAppDispatch();

    const mapCenter = useAppSelector(selectMapCenter);

    // const years = getAvailableYears();

    const years = useAppSelector(selectLandcoverAnimationYears);

    // const shouldShowSentinel2Layer = useAppSelector(
    //     selectShouldShowSatelliteImageryLayer
    // );

    const [frameData, setFrameData] = useState<AnimationFrameData[]>([]);

    useEffect(() => {
        (async () => {
            if (!mediaLayerElements?.length) {
                setFrameData([]);
                return;
            }

            try {
                // // take a screenshot for the basemap layers if it is showing the landcover layer,
                // // as the landcover layer will need to be combined/blended with the screenshot of basemap layers
                // const screenshot = !shouldShowSentinel2Layer
                //     ? await mapView.takeScreenshot()
                //     : null;
                // // console.log(screenshot)

                // // load media layer elements as an array of HTML Image Elements
                // const images = await Promise.all(
                //     mediaLayerElements.map((d) => {
                //         return shouldShowSentinel2Layer
                //             ? loadImageAsHTMLIMageElement(d.image as string)
                //             : combineLandcoverImageWithMapScreenshot(
                //                   d.image as string,
                //                   screenshot.data
                //               ); // if showing Landcover layer, the image need to be blended with the screenshot of basemap layers
                //     })
                // );

                const { basemapScreenshot, referenceLayersScreenshot } =
                    await getScreenshotOfBasemapLayers(
                        mapView,
                        appConfig.webmapId
                    );

                // load media layer elements as an array of HTML Image Elements
                const images = await Promise.all(
                    mediaLayerElements.map((d) => {
                        return combineLandcoverImageWithMapScreenshots(
                            d.image as string,
                            basemapScreenshot.data,
                            referenceLayersScreenshot.data
                        ); // if showing Landcover layer, the image need to be blended with the screenshot of basemap layers
                    })
                );

                const data: AnimationFrameData[] = images.map(
                    (image, index) => {
                        return {
                            image,
                            imageInfo: `${
                                years[index]
                            }  |  x ${mapCenter[0].toFixed(
                                3
                            )} y ${mapCenter[1].toFixed(
                                3
                            )}  |  ${animationMetadataSources}`,
                        } as AnimationFrameData;
                    }
                );

                setFrameData(data);
            } catch (error) {
                console.error('Error loading image elements:', error);
                dispatch(animationStatusChanged('failed-loading'));
            }
        })();
    }, [mediaLayerElements]);

    return frameData;
};
