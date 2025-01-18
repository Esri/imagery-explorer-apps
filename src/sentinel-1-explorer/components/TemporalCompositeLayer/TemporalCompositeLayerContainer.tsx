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

import MapView from '@arcgis/core/views/MapView';
import React, { FC, useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectListOfQueryParams,
    // selectQueryParams4MainScene,
    // selectQueryParams4SecondaryScene,
    selectSelectedItemFromListOfQueryParams,
} from '@shared/store/ImageryScene/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { ColorBand, TemporalCompositeLayer } from './TemporalCompositeLayer';
import {
    selectIsTemporalCompositeLayerOn,
    selectRasterFunction4TemporalCompositeTool,
} from '@shared/store/TemporalCompositeTool/selectors';
import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const TemporalCompositeLayerContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const mode = useAppSelector(selectAppMode);

    const isTemporalCompositeLayerOn = useAppSelector(
        selectIsTemporalCompositeLayerOn
    );

    const listOfQueryParams = useAppSelector(selectListOfQueryParams);

    const selectedItemFromListOfQueryParams = useAppSelector(
        selectSelectedItemFromListOfQueryParams
    );

    const anailysisTool = useAppSelector(selectActiveAnalysisTool);

    const rasterFunctionName: Sentinel1FunctionName = useAppSelector(
        selectRasterFunction4TemporalCompositeTool
    ) as Sentinel1FunctionName;

    /**
     * Determines the visibility of the temporal composite layer
     * @returns {boolean} True if the layer should be visible, otherwise false.
     */
    const isVisible = useMemo(() => {
        if (mode !== 'analysis') {
            return false;
        }

        if (anailysisTool !== 'temporal composite') {
            return false;
        }

        // When displaying the final composite result that combines all three scenes,
        // we need to ensure that each scene for the color bands has an assigned object ID.
        if (
            isTemporalCompositeLayerOn &&
            listOfQueryParams[0]?.objectIdOfSelectedScene &&
            listOfQueryParams[1]?.objectIdOfSelectedScene &&
            listOfQueryParams[2]?.objectIdOfSelectedScene
        ) {
            return true;
        }

        // When displaying an individual band on the map,
        // ensure that the selected imagery scene has an object ID assigned.
        if (
            isTemporalCompositeLayerOn === false &&
            selectedItemFromListOfQueryParams?.objectIdOfSelectedScene
        ) {
            return true;
        }

        // return false to hide the layer
        return false;
    }, [
        mode,
        anailysisTool,
        isTemporalCompositeLayerOn,
        listOfQueryParams,
        selectedItemFromListOfQueryParams,
    ]);

    /**
     * Determines the selected color band to use for rendering the imagery scene
     * when displaying an individual color band on the map.
     */
    const selectedColorband: ColorBand = useMemo(() => {
        // Set the selected color band to null when displaying the final composite result.
        if (isTemporalCompositeLayerOn) {
            return null;
        }

        // If query parameters are not available or no item is selected, return null.
        if (!listOfQueryParams?.length || !selectedItemFromListOfQueryParams) {
            return null;
        }

        // Determine the color band based on the selected item's unique ID.
        if (
            listOfQueryParams[0]?.uniqueId ===
            selectedItemFromListOfQueryParams.uniqueId
        ) {
            return 'red';
        }

        if (
            listOfQueryParams[1]?.uniqueId ===
            selectedItemFromListOfQueryParams.uniqueId
        ) {
            return 'green';
        }

        if (
            listOfQueryParams[2]?.uniqueId ===
            selectedItemFromListOfQueryParams.uniqueId
        ) {
            return 'blue';
        }

        return null;
    }, [
        selectedItemFromListOfQueryParams,
        listOfQueryParams,
        isTemporalCompositeLayerOn,
    ]);

    return (
        <TemporalCompositeLayer
            mapView={mapView}
            groupLayer={groupLayer}
            visible={isVisible}
            rasterFunctionName={rasterFunctionName}
            objectIdOfRedBand={listOfQueryParams[0]?.objectIdOfSelectedScene}
            objectIdOfGreenBand={listOfQueryParams[1]?.objectIdOfSelectedScene}
            objectIdOfBlueBand={listOfQueryParams[2]?.objectIdOfSelectedScene}
            selectedColorband={selectedColorband}
        />
    );
};
