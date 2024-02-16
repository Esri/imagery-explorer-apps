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
import React, { FC, useCallback, useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { selectSwipeWidgetHandlerPosition } from '@shared/store/Map/selectors';
import { useDispatch } from 'react-redux';
import { popupAnchorLocationChanged } from '@shared/store/Map/reducer';
import { getLoadingIndicator, getMainContent } from './helper';
import { watch } from '@arcgis/core/core/reactiveUtils';
import {
    getPixelValuesFromIdentifyTaskResponse,
    identify,
} from '@shared/services/landsat-level-2/identify';
import { getFormattedLandsatScenes } from '@shared/services/landsat-level-2/getLandsatScenes';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
// import { canBeConvertedToNumber } from '@shared/utils/snippets/canBeConvertedToNumber';

type Props = {
    mapView?: MapView;
};

type MapViewOnClickHandler = (mapPoint: Point, mousePointX: number) => void;

let controller: AbortController = null;

/**
 * Check and see if user clicked on the left side of the swipe widget
 * @param swipePosition position of the swipe handler, value should be bewteen 0 - 100
 * @param mapViewWidth width of the map view container
 * @param mouseX x position of the mouse click event
 * @returns boolean indicates if clicked on left side
 */
const didClickOnLeftSideOfSwipeWidget = (
    swipePosition: number,
    mapViewWidth: number,
    mouseX: number
) => {
    const widthOfLeftHalf = mapViewWidth * (swipePosition / 100);
    return mouseX <= widthOfLeftHalf;
};

export const Popup: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useSelector(
        selectQueryParams4SecondaryScene
    );

    const swipePosition = useSelector(selectSwipeWidgetHandlerPosition);

    const openPopupRef = useRef<MapViewOnClickHandler>();

    const closePopUp = (message: string) => {
        console.log('calling closePopUp', message);

        if (controller) {
            controller.abort();
        }

        mapView.closePopup();

        dispatch(popupAnchorLocationChanged(null));
    };

    openPopupRef.current = async (mapPoint: Point, mousePointX: number) => {
        // no need to show pop-up if in Animation Mode
        if (mode === 'animate') {
            return;
        }

        // no need to show pop-up when using Trend or Spectral Profile Tool
        if (
            mode === 'analysis' &&
            (analysisTool === 'trend' || analysisTool === 'spectral')
        ) {
            return;
        }

        dispatch(popupAnchorLocationChanged(mapPoint.toJSON()));

        mapView.popup.open({
            title: null,
            location: mapPoint,
            content: getLoadingIndicator(),
        });

        try {
            let queryParams = queryParams4MainScene;

            // in swipe mode, we need to use the query Params based on position of mouse click event
            if (mode === 'swipe') {
                queryParams = didClickOnLeftSideOfSwipeWidget(
                    swipePosition,
                    mapView.width,
                    mousePointX
                )
                    ? queryParams4MainScene
                    : queryParams4SecondaryScene;
            }

            if (controller) {
                controller.abort();
            }

            controller = new AbortController();

            const res = await identify({
                point: mapPoint,
                objectId:
                    mode !== 'dynamic'
                        ? queryParams?.objectIdOfSelectedScene
                        : null,
                abortController: controller,
            });

            // console.log(res)

            const features = res?.catalogItems?.features;

            if (!features.length) {
                throw new Error('cannot find landsat scene');
            }

            const sceneData = getFormattedLandsatScenes(features)[0];

            const bandValues: number[] =
                getPixelValuesFromIdentifyTaskResponse(res);

            if (!bandValues) {
                throw new Error('identify task does not return band values');
            }
            // console.log(bandValues)

            const title = `${sceneData.satellite} | ${formatInUTCTimeZone(
                sceneData.acquisitionDate,
                'MMM dd, yyyy'
            )}`;

            mapView.openPopup({
                // Set the popup's title to the coordinates of the location
                title: title,
                location: mapPoint, // Set the location of the popup to the clicked location
                content: getMainContent(bandValues, mapPoint),
            });
        } catch (err: any) {
            console.error(
                'failed to open popup for landsat scene',
                err.message
            );

            // no need to close popup if the user just clicked on a different location before
            // the popup data is returned
            if (err.message.includes('aborted')) {
                return;
            }

            closePopUp('close because error happened during data fetching');
        }
    };

    const init = async () => {
        // It's necessary to overwrite the default click for the popup
        // behavior in order to display your own popup
        mapView.popupEnabled = false;
        mapView.popup.dockEnabled = false;
        mapView.popup.collapseEnabled = false;
        mapView.popup.alignment = 'bottom-right';

        mapView.on('click', (evt) => {
            openPopupRef.current(evt.mapPoint, evt.x);
        });

        watch(
            () => mapView.popup.visible,
            (newVal, oldVal) => {
                // this callback sometimes get triggered before the popup get launched for the first time
                // therefore we should only proceed when both the new value and old value if ready
                if (newVal === undefined || oldVal === undefined) {
                    return;
                }

                if (oldVal === true && newVal === false) {
                    // need to call closePopup whne popup becomes invisible
                    // so the Popup anchor location can also be removed from the map
                    closePopUp(
                        'close because mapView.popup.visible becomes false'
                    );
                }
            }
        );
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (mapView) {
            if (!mapView?.popup?.visible) {
                return;
            }

            closePopUp('close because app state has changed');
        }
    }, [
        mode,
        analysisTool,
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
        swipePosition,
    ]);

    return null;
};
