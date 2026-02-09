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

import React, { FC, useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import { MAPILLARY_TILES_URL } from '@shared/services/mapillary/config';

type Props = {
    mapView?: MapView;
    visible: boolean;
};

/**
 * Mapillary coverage layer component
 * Shows green lines on the map where Mapillary street-level imagery is available
 */
export const MapillaryLayer: FC<Props> = ({ mapView, visible }) => {
    const layerRef = useRef<VectorTileLayer | null>(null);

    useEffect(() => {
        if (!mapView) {
            return;
        }

        // Create Mapillary vector tile layer with custom styling
        // The layer shows sequences (connected images) as green lines
        console.log('MapillaryLayer: Creating layer with URL:', MAPILLARY_TILES_URL);

        const layer = new VectorTileLayer({
            id: 'mapillary-coverage-layer',
            title: 'Mapillary Coverage',
            opacity: 1.0,
            visible: visible,
            // Custom style to show sequences as bright green lines
            style: {
                version: 8,
                sources: {
                    'mapillary-source': {
                        type: 'vector',
                        tiles: [MAPILLARY_TILES_URL],
                        minzoom: 0,
                        maxzoom: 14,
                    },
                },
                layers: [
                    {
                        id: 'mapillary-sequences',
                        type: 'line',
                        source: 'mapillary-source',
                        'source-layer': 'sequence',
                        minzoom: 6,
                        layout: {
                            'line-cap': 'round',
                            'line-join': 'round',
                        },
                        paint: {
                            'line-opacity': 0.9,
                            'line-color': '#05CB63', // Mapillary green
                            'line-width': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                6,
                                0.5,
                                12,
                                2,
                                18,
                                6,
                                22,
                                10,
                            ],
                        },
                    },
                    {
                        id: 'mapillary-points',
                        type: 'circle',
                        source: 'mapillary-source',
                        'source-layer': 'image',
                        minzoom: 14,
                        paint: {
                            'circle-radius': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                14,
                                1,
                                18,
                                4,
                                22,
                                8,
                            ],
                            'circle-color': '#05CB63',
                            'circle-opacity': 0.8,
                            'circle-stroke-width': 1,
                            'circle-stroke-color': '#ffffff',
                            'circle-stroke-opacity': 0.5,
                        },
                    },
                ],
            },
        });

        console.log('MapillaryLayer: Layer created, adding to map');
        layer.load().then(() => {
            console.log('MapillaryLayer: Layer loaded successfully');
        }).catch((error) => {
            console.error('MapillaryLayer: Error loading layer:', error);
        });

        mapView.map.add(layer);
        layerRef.current = layer;

        return () => {
            if (layerRef.current && mapView?.map) {
                try {
                    mapView.map.remove(layerRef.current);
                    layerRef.current.destroy();
                } catch (error) {
                    console.error('MapillaryLayer: Error removing layer:', error);
                } finally {
                    layerRef.current = null;
                }
            }
        };
    }, [mapView]);

    // Update visibility when prop changes
    useEffect(() => {
        if (layerRef.current) {
            layerRef.current.visible = visible;
        }
    }, [visible]);

    return null;
};
