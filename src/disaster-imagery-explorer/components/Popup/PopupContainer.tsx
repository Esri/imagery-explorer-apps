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
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
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

    const fetchPopupData = async (
        mapPoint: Point,
        clickedOnLeftSideOfSwipeWidget: boolean
    ) => {
        try {
            let queryParams = queryParams4MainScene;

            // in swipe mode, we need to use the query Params based on position of mouse click event
            if (mode === 'swipe') {
                queryParams = clickedOnLeftSideOfSwipeWidget
                    ? queryParams4MainScene
                    : queryParams4SecondaryScene;
            }

            if (controller) {
                controller.abort();
            }

            controller = new AbortController();

            const objectId = queryParams?.objectIdOfSelectedScene;

            if (!objectId) {
                throw new Error('No scene is selected');
            }

            const res = await identify({
                serviceURL: DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
                point: mapPoint,
                objectIds: [objectId],
                maxItemCount: 1,
                resolution: mapView.resolution,
                abortController: controller,
            });

            // console.log(res)

            const features = res?.catalogItems?.features;

            if (!features.length) {
                throw new Error('cannot find sentinel-1 scene');
            }

            const sceneData = getFormattedDisasterResponseScenes(features)[0];

            if (!sceneData) {
                throw new Error('failed to get disaster response scene data');
            }

            const title = `Disaster Imagery`;

            const content = `Acquisition Date: ${sceneData.formattedAcquisitionDate + ' ' + sceneData.formattedAcuisitionTime}`;

            setData({
                // Set the popup's title to the coordinates of the location
                title,
                location: mapPoint, // Set the location of the popup to the clicked location
                content: getPopUpContentWithLocationInfo(mapPoint, content),
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

    return <MapPopup data={data} mapView={mapView} onOpen={fetchPopupData} />;
};
