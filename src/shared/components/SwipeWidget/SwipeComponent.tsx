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

import './style.css';
import React, { FC, useEffect, useRef } from 'react';

import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { ArcgisSwipe } from '@arcgis/map-components/components/arcgis-swipe';
import '@arcgis/map-components/components/arcgis-swipe';
import MapView from '@arcgis/core/views/MapView';
import { ar } from 'date-fns/locale';
import { ArcgisMap } from '@arcgis/map-components/components/arcgis-map';
import { on } from 'events';
import { useAutoSwipe4Component } from './useAutoSwipe4Component';

type Props = {
    /**
     * Indicate if Swipe Widget is visible
     */
    visible: boolean;
    /**
     * MapView instance to which the Swipe Widget is added. If not provided, the Swipe Widget will try to find the MapView instance from the DOM.
     */
    mapView: MapView;
    leadingLayer: ImageryLayer;
    trailingLayer: ImageryLayer;
    /**
     * Fires when user drag and change swipe position
     */
    positionOnChange: (position: number) => void;
};

/**
 * Swipe Widget to compare imagery layers using different query params
 */
export const SwipeComponent: FC<Props> = ({
    mapView,
    visible,
    leadingLayer,
    trailingLayer,
    positionOnChange,
}: Props) => {
    const arcgisSwipeRef = useRef<ArcgisSwipe | null>(null);

    useAutoSwipe4Component(arcgisSwipeRef.current);

    const addSwipeComponentToMapView = () => {
        console.log('initializing swipe widget');

        if (arcgisSwipeRef.current) {
            return;
        }

        const mapViewComponent = document.querySelector(
            'arcgis-map'
        ) as ArcgisMap;

        if (!mapViewComponent) {
            console.error('MapView component not found in the DOM');
            return;
        }

        // Create the Swipe component
        const swipeComponent = document.createElement(
            'arcgis-swipe'
        ) as ArcgisSwipe;
        swipeComponent.position = 50;
        swipeComponent.view = mapView;
        swipeComponent.startLayers.add(leadingLayer);
        swipeComponent.endLayers.add(trailingLayer);

        // set css variables to customize the style of the Swipe component
        swipeComponent.style.setProperty(
            '--calcite-color-background',
            'var(--custom-background)'
        );
        swipeComponent.style.setProperty(
            '--calcite-corner-radius-round',
            '100%'
        );

        // Add the Swipe component to the MapView component
        mapViewComponent.appendChild(swipeComponent);

        // Add event listener for swipe position change
        swipeComponent.addEventListener('arcgisSwipeInput', () => {
            const arcgisSwipe = arcgisSwipeRef.current;
            positionOnChange(arcgisSwipe.position);
        });

        // Store the Swipe component instance in the ref so that we can access it later for cleanup
        arcgisSwipeRef.current = swipeComponent;
    };

    const destroySwipeComponent = () => {
        console.log('removing swipe component');

        if (arcgisSwipeRef.current) {
            arcgisSwipeRef.current.destroy();
            arcgisSwipeRef.current = null;
        }
    };

    useEffect(() => {
        if (!leadingLayer || !trailingLayer) {
            console.warn('Leading layer or trailing layer is not ready yet');
            return;
        }

        if (visible) {
            addSwipeComponentToMapView();
        } else {
            destroySwipeComponent();
        }
    }, [visible, leadingLayer, trailingLayer]);

    return null;
};
