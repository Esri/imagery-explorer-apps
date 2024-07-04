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
    selectMapPopupAnchorLocation,
    selectSwipeWidgetHandlerPosition,
} from '@shared/store/Map/selectors';
import { useDispatch } from 'react-redux';
import { popupAnchorLocationChanged } from '@shared/store/Map/reducer';
import { watch } from '@arcgis/core/core/reactiveUtils';
import {
    selectAppMode,
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { getLoadingIndicator, didClickOnLeftSideOfSwipeWidget } from './helper';

export type MapPopupData = {
    /**
     * title of the popup
     */
    title: string;
    /**
     * popup content
     */
    content: string | HTMLDivElement;
    /**
     * point of the popup anchor location
     */
    location: Point;
    /**
     * error happened during the process of fetching popup data
     */
    error?: Error;
};

type Props = {
    data: MapPopupData;
    onOpen: (point: Point, clickedOnLeftSideOfSwipeWidget: boolean) => void;
    mapView?: MapView;
};

type MapViewOnClickHandler = (mapPoint: Point, mousePointX: number) => void;

export const MapPopup: FC<Props> = ({ data, mapView, onOpen }: Props) => {
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
        // console.log('calling closePopUp', message);

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

        // popupLocation.current = mapPoint;

        mapView.openPopup({
            title: null,
            location: mapPoint,
            content: getLoadingIndicator(),
        });

        onOpen(
            mapPoint,
            didClickOnLeftSideOfSwipeWidget(
                swipePosition,
                mapView.width,
                mousePointX
            )
        );
    };

    const init = async () => {
        // It's necessary to overwrite the default click for the popup
        // behavior in order to display your own popup
        mapView.popupEnabled = false;
        mapView.popup.dockEnabled = false;
        // mapView.popup.collapseEnabled = false;
        mapView.popup.alignment = 'bottom-right';
        mapView.popup.visibleElements = {
            collapseButton: false,
        };

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
        if (!mapView) {
            return;
        }

        if (!mapView?.popup?.visible) {
            return;
        }

        closePopUp('close because app state has changed');
    }, [
        mode,
        analysisTool,
        swipePosition,
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
    ]);

    useEffect(() => {
        if (!data) {
            closePopUp('close popup because data is empty');
        } else {
            const { title, content, location, error } = data;

            if (error) {
                console.error(
                    'failed to open popup for imagery scene',
                    error.message
                );

                // no need to close popup if the user just clicked on a different location before
                // the popup data is returned
                if (error.message.includes('aborted')) {
                    return;
                }

                closePopUp('close because error happened during data fetching');

                return;
            }

            mapView.openPopup({
                // Set the popup's title to the coordinates of the location
                title,
                location,
                content,
            });
        }
    }, [data]);

    return null;
};
