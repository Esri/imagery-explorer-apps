/* Copyright 2024 Esri
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
import { useSelector } from 'react-redux';
import {
    // selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import { MapPopup, MapPopupData } from '@shared/components/MapPopup/MapPopup';
import { identify } from '@shared/services/helpers/identify';
import { SENTINEL_1_SERVICE_URL } from '@shared/services/sentinel-1/config';
import { getFormattedSentinel1Scenes } from '@shared/services/sentinel-1/getSentinel1Scenes';
import { getPixelValuesFromIdentifyTaskResponse } from '@shared/services/helpers/getPixelValuesFromIdentifyTaskResponse';
import { getMainContent } from './helper';

type Props = {
    mapView?: MapView;
};

let controller: AbortController = null;

export const PopupContainer: FC<Props> = ({ mapView }) => {
    const mode = useSelector(selectAppMode);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useSelector(
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

            const res = await identify({
                serviceURL: SENTINEL_1_SERVICE_URL,
                point: mapPoint,
                objectIds:
                    mode !== 'dynamic'
                        ? [queryParams?.objectIdOfSelectedScene]
                        : null,
                abortController: controller,
            });

            // console.log(res)

            const features = res?.catalogItems?.features;

            if (!features.length) {
                throw new Error('cannot find sentinel-1 scene');
            }

            const sceneData = getFormattedSentinel1Scenes(features)[0];

            // const bandValues: number[] =
            //     getPixelValuesFromIdentifyTaskResponse(res);

            // if (!bandValues) {
            //     throw new Error('identify task does not return band values');
            // }
            // // console.log(bandValues)

            const title = `Sentinel-1 | ${formatInUTCTimeZone(
                sceneData.acquisitionDate,
                'MMM dd, yyyy'
            )}`;

            setData({
                // Set the popup's title to the coordinates of the location
                title,
                location: mapPoint, // Set the location of the popup to the clicked location
                content: getMainContent(mapPoint),
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
