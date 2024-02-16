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

import React, { FC, useEffect, useRef } from 'react';
import IMapView from '@arcgis/core/views/MapView';
import IFeatureLayer from '@arcgis/core/layers/FeatureLayer';
import IPoint from '@arcgis/core/geometry/Point';
import IGraphic from '@arcgis/core/Graphic';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import { LULC_TIMESERIES_STORE } from '@landcover-explorer/constants';

type Props = {
    availableYears?: number[];
    mapView?: IMapView;
};
/**
 * Get URL of the GeoTiff Image for the selected year and area
 * @param year
 * @param imageName
 * @returns
 */
const getImageURL = (year: number, imageName: string) => {
    const nextYear = year + 1;
    return `${LULC_TIMESERIES_STORE}/lc${year}/${imageName}_${year}0101-${nextYear}0101.tif`;
};

const LulcFootprintsLayer: FC<Props> = ({ availableYears, mapView }: Props) => {
    const layerRef = useRef<IFeatureLayer>();

    const layerViewRef = useRef<__esri.FeatureLayerView>();

    const highlight = useRef<__esri.Handle>();

    const init = async () => {
        layerRef.current = mapView.map.allLayers.find(
            (layer) => layer.title === 'LULC Footprints'
        ) as IFeatureLayer;

        layerViewRef.current = await mapView.whenLayerView(layerRef.current);

        // It's necessary to overwrite the default click for the popup
        // behavior in order to display your own popup
        mapView.popupEnabled = false;
        mapView.popup.dockEnabled = false;
        mapView.popup.collapseEnabled = false;

        addEventHandlers();
    };

    const addEventHandlers = async () => {
        try {
            reactiveUtils.watch(
                () => mapView.popup.visible,
                () => {
                    // remove highlight graphic whne popup is closed
                    if (!mapView.popup.visible) {
                        resetHighlight();
                    }
                }
            );

            mapView.on('click', (evt) => {
                queryFeature(evt.mapPoint);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const resetHighlight = () => {
        // Remove the previous highlights
        if (highlight.current) {
            highlight.current.remove();
        }
    };

    const getMainContent = (feature: IGraphic) => {
        const popupDiv = document.createElement('div');

        const { attributes } = feature;

        const size = (attributes.FileSize / 1000).toFixed(0);
        const imageName = attributes.ImageName;

        const links = availableYears
            .sort((a, b) => b - a)
            .map((year) => {
                const url = getImageURL(year, imageName);

                return `
                    <div class='mb-1 text-sm'>
                        <a href="${url}" target="_blank">
                            <div class="flex items-center group">
                                <svg xmlns="http://www.w3.org/2000/svg" class="opacity-0 group-hover:opacity-95" viewBox="0 0 16 16" height="16" width="16"><path fill="currentColor" d="M9 2v7.293l1.618-1.619.707.707-2.808 2.81-2.81-2.81.707-.707L8 9.26V2zM4 14h9v-1H4z"/><path fill="none" d="M0 0h16v16H0z"/></svg>
                                <span class='ml-2'>${year}</span>
                            </div>
                        </a>
                    </div>
                `;
            })
            .join('');

        popupDiv.innerHTML = `
            <div class="text-custom-light-blue">
                <div class="my-2">
                    <p>Approximate Size: ${size} MB</p>
                </div>
                <div class='flex'>
                    <div class='mt-2 ml-1'>
                        ${links}
                    </div>
                </div>
            </div>
        `;

        return popupDiv;
    };

    const queryFeature = async (mapPoint: IPoint) => {
        if (!layerRef.current) {
            return;
        }

        const featureSet = await layerRef.current.queryFeatures({
            geometry: mapPoint,
            spatialRelationship: 'intersects',
            returnGeometry: false,
            returnQueryGeometry: true,
            outFields: ['*'],
            num: 1,
        });

        if (!featureSet || !featureSet.features.length) {
            return;
        }

        const graphic = featureSet?.features[0];

        mapView.popup.open({
            location: mapPoint,
            // features: featureSet.features,
            // featureMenuOpen: true
            title: 'Download',
            content: getMainContent(graphic),
        });

        resetHighlight();

        highlight.current = layerViewRef.current.highlight(graphic);
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return null;
};

export default LulcFootprintsLayer;
