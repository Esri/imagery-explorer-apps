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
import React, { FC, useCallback, useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import { useAppSelector } from '@shared/store/configureStore';
import {
    // selectMapPopupAnchorLocation,
    selectSwipeWidgetHandlerPosition,
} from '@shared/store/Map/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
import { popupAnchorLocationChanged } from '@shared/store/Map/reducer';
import { watch } from '@arcgis/core/core/reactiveUtils';
import {
    selectAppMode,
    selectActiveAnalysisTool,
    // selectQueryParams4MainScene,
    // selectQueryParams4SecondaryScene,
    selectQueryParams4SceneInSelectedMode,
    selectSwipeSubMode,
    selectIsBasemapOnRightSideOfSwipe,
} from '@shared/store/ImageryScene/selectors';
import {
    getLoadingIndicator,
    didClickOnLeftSideOfSwipeWidget,
    // formatPopupElements,
    formatPopupComponent,
} from './helper';
import { selectChangeCompareLayerIsOn } from '@shared/store/ChangeCompareTool/selectors';
import { selectIsTemporalCompositeLayerOn } from '@shared/store/TemporalCompositeTool/selectors';
import { ArcgisPopup } from '@arcgis/map-components/components/arcgis-popup';
import { ArcgisMap } from '@arcgis/map-components/components/arcgis-map';

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
    const popupRef = useRef<ArcgisPopup>(null);

    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectAppMode);

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    // const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    // const queryParams4SecondaryScene = useAppSelector(
    //     selectQueryParams4SecondaryScene
    // );

    const queryParams4SceneInSelectedMode = useAppSelector(
        selectQueryParams4SceneInSelectedMode
    );

    const isChangeCompareLayerOn = useAppSelector(selectChangeCompareLayerIsOn);

    const isTemporalCompositeLayerOn = useAppSelector(
        selectIsTemporalCompositeLayerOn
    );

    const swipePosition = useAppSelector(selectSwipeWidgetHandlerPosition);

    const swipeSubMode = useAppSelector(selectSwipeSubMode);

    const isBasemapOnRightSideOfSwipeWidget = useAppSelector(
        selectIsBasemapOnRightSideOfSwipe
    );

    const openPopupRef = useRef<MapViewOnClickHandler>(null);

    const closePopUp = (message: string) => {
        // console.log('calling closePopUp', message);

        // mapView.closePopup();

        if (!popupRef.current) {
            // console.error('popupRef.current is null, cannot close popup');
            return;
        }

        popupRef.current.open = false;

        dispatch(popupAnchorLocationChanged(null));
    };

    const openPopup = ({ title, content, location }: MapPopupData) => {
        if (!popupRef.current) {
            console.error('popupRef.current is null, cannot open popup');
            return;
        }

        const popupComponent = popupRef.current;

        popupComponent.clear();
        popupComponent.location = location;
        popupComponent.heading = title;
        popupComponent.content = content;
        popupComponent.open = true;
    };

    openPopupRef.current = async (mapPoint: Point, mousePointX: number) => {
        // no need to show pop-up if in Animation Mode
        if (mode === 'animate') {
            return;
        }

        // no need to show pop-up when using the following analysis tools: 'temporal profile', 'spectral profile', 'urban heat island'
        if (
            mode === 'analysis' &&
            (analysisTool === 'trend' ||
                analysisTool === 'spectral' ||
                analysisTool === 'urban heat island')
        ) {
            return;
        }

        // no need to show pop-up in change analysis when change compare layer is on
        if (
            mode === 'analysis' &&
            analysisTool === 'change' &&
            isChangeCompareLayerOn
        ) {
            return;
        }

        // no need to show pop-up if the temporal composite layer is on
        if (
            mode === 'analysis' &&
            analysisTool === 'temporal composite' &&
            isTemporalCompositeLayerOn
        ) {
            return;
        }

        dispatch(popupAnchorLocationChanged(mapPoint.toJSON()));

        // popupLocation.current = mapPoint;

        openPopup({
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
        const mapViewComponent = document.querySelector(
            'arcgis-map'
        ) as ArcgisMap;

        if (!mapViewComponent) {
            console.error('MapView component not found in the DOM');
            return;
        }

        if (popupRef.current) {
            console.warn('popupRef.current is already initialized');
            return;
        }

        // Create the Swipe component
        const popupComponent = document.createElement(
            'arcgis-popup'
        ) as ArcgisPopup;

        formatPopupComponent(popupComponent);

        // Assign the reference to the popup component
        popupRef.current = popupComponent;

        // Add the Swipe component to the MapView component
        mapViewComponent.appendChild(popupComponent);

        // // It's necessary to overwrite the default click for the popup
        // // behavior in order to display your own popup
        // mapView.popupEnabled = false;
        // mapView.popup.dockEnabled = false;
        // // mapView.popup.collapseEnabled = false;
        // mapView.popup.alignment = 'bottom-right';

        // // Forrmat the popup elements to only show the necessary elements
        // formatPopupElements(mapView);

        mapView.on('click', (evt) => {
            openPopupRef.current(evt.mapPoint, evt.x);
        });

        watch(
            () => popupRef.current.open,
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

        // if (!mapView?.popup?.visible) {
        //     return;
        // }

        if (popupRef.current && !popupRef.current.open) {
            // console.log('popup is not open, no need to close it');
            return;
        }

        closePopUp('close because app state has changed');
    }, [
        mode,
        analysisTool,
        swipePosition,
        // queryParams4MainScene?.objectIdOfSelectedScene,
        // queryParams4SecondaryScene?.objectIdOfSelectedScene,
        queryParams4SceneInSelectedMode?.objectIdOfSelectedScene,
        isChangeCompareLayerOn,
        isTemporalCompositeLayerOn,
        swipeSubMode,
        isBasemapOnRightSideOfSwipeWidget,
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

            openPopup({
                // Set the popup's title to the coordinates of the location
                title,
                location,
                content,
            });
        }
    }, [data]);

    return null;
};
