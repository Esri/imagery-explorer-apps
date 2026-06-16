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

// import './PopUp.css';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import { useAppSelector } from '@shared/store/configureStore';
import {
    // selectActiveAnalysisTool,
    selectAppMode,
    selectIsBasemapOnRightSideOfSwipe,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
    selectSwipeSubMode,
} from '@shared/store/ImageryScene/selectors';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import { MapPopup, MapPopupData } from '@shared/components/MapPopup/MapPopup';
import { getPopUpContentWithLocationInfo } from '@shared/components/MapPopup/helper';
import {
    getDisasterResponseSceneByObjectId,
    getFormattedDisasterResponseScenes,
} from '@shared/services/disaster-response/getDisasterResponseScenes';
import { identify } from '@shared/services/helpers/identify';
import { DISASTER_RESPONSE_IMAGERY_SERVICE_URL } from '@shared/services/disaster-response/config';
import {
    getDIExPopupContent4SelectedScene,
    getPopupContentForWorldImagery,
} from './helpers';
import { selectMapScale } from '@shared/store/Map/selectors';

type Props = {
    mapView?: MapView;
};

let controller: AbortController = null;

export const PopupContainer: FC<Props> = ({ mapView }) => {
    const mode = useAppSelector(selectAppMode);

    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const [data, setData] = useState<MapPopupData>();

    const swipeSubMode = useAppSelector(selectSwipeSubMode);

    const isBasemapOnRightSideOfSwipeWidget = useAppSelector(
        selectIsBasemapOnRightSideOfSwipe
    );

    const mapScale = useAppSelector(selectMapScale);

    const mapScaleRef = useRef(mapScale);

    const fetchPopupData = async (
        mapPoint: Point,
        clickedOnLeftSideOfSwipeWidget: boolean
    ) => {
        try {
            if (controller) {
                controller.abort();
            }

            controller = new AbortController();

            let popupTitle = '';
            let popupContent = '';

            // Check if the user clicked on the basemap layer in swipe mode
            const clickedOnBasemapLayer =
                mode === 'swipe' &&
                swipeSubMode === 'scene-to-basemap' &&
                ((clickedOnLeftSideOfSwipeWidget &&
                    isBasemapOnRightSideOfSwipeWidget === false) ||
                    (!clickedOnLeftSideOfSwipeWidget &&
                        isBasemapOnRightSideOfSwipeWidget));

            if (clickedOnBasemapLayer) {
                popupTitle = 'World Imagery';
                popupContent =
                    'This is the basemap layer, no scene data available.';

                const res = await getPopupContentForWorldImagery({
                    mapPoint,
                    scale: mapScaleRef.current,
                });

                popupTitle = res.title;
                popupContent = res.content;
            } else {
                // If the user clicked on the scene layer, we need to get the popup content based on the selected scene's objectId and the mapPoint of the click event.
                let queryParams = queryParams4MainScene;

                // If user is vieweing the scene to scene swipe mode, we need to use the query params based on position of mouse click event
                if (mode === 'swipe' && swipeSubMode === 'scene-to-scene') {
                    queryParams = clickedOnLeftSideOfSwipeWidget
                        ? queryParams4MainScene
                        : queryParams4SecondaryScene;
                }

                const objectId = queryParams?.objectIdOfSelectedScene;

                if (!objectId) {
                    throw new Error('No scene is selected');
                }

                const res = await getDIExPopupContent4SelectedScene({
                    objectId,
                    mapPoint,
                    resolution: mapView?.resolution,
                    abortController: controller,
                });

                popupTitle = res.title;
                popupContent = res.content;
            }

            if (!popupTitle || !popupContent) {
                // safe guard, this should not happen if the above code is working correctly
                throw new Error(
                    'Failed to get popup content for the selected scene'
                );
            }

            setData({
                // Set the popup's title to the coordinates of the location
                title: popupTitle,
                location: mapPoint, // Set the location of the popup to the clicked location
                content: getPopUpContentWithLocationInfo(
                    mapPoint,
                    popupContent
                ),
            });
        } catch (error: any) {
            setData({
                title: undefined,
                location: undefined,
                content: undefined,
                error,
            });
        }
    };

    useEffect(() => {
        mapScaleRef.current = mapScale;
    }, [mapScale]);

    return <MapPopup data={data} mapView={mapView} onOpen={fetchPopupData} />;
};
