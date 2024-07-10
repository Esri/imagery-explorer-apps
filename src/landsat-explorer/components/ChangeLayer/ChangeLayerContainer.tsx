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
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
// import { ChangeLayer } from './ChangeLayer';
import {
    selectChangeCompareLayerIsOn,
    selectFullPixelValuesRangeInChangeCompareTool,
    selectSelectedOption4ChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { getBandIndexesBySpectralIndex } from '@shared/services/landsat-level-2/helpers';
import { SpectralIndex } from '@typing/imagery-service';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { getLandsatFeatureByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { getPixelColor4ChangeCompareLayer } from '@shared/components/ChangeCompareTool/helpers';
import { ImageryLayerWithPixelFilter } from '@shared/components/ImageryLayerWithPixelFilter';
import { useCalculateTotalAreaByPixelsCount } from '@shared/hooks/useCalculateTotalAreaByPixelsCount';
import { useDispatch } from 'react-redux';
import { countOfVisiblePixelsChanged } from '@shared/store/Map/reducer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

/**
 * This function retrieves a raster function that can be used to visualize changes between two input Landsat scenes.
 * The output raster function applies an `Arithmetic` operation to calculate the difference of a selected spectral index
 * between two input rasters.
 *
 * @param spectralIndex - The user-selected spectral index to analyze changes.
 * @param queryParams4SceneA - Query parameters for the first selected Landsat scene.
 * @param queryParams4SceneB - Query parameters for the second selected Landsat scene.
 * @returns A Raster Function that contains the `Arithmetic` function to visualize spectral index changes.
 *
 * @see https://developers.arcgis.com/documentation/common-data-types/raster-function-objects.htm
 */
export const getRasterFunction4ChangeLayer = async (
    /**
     * name of selected spectral index
     */
    spectralIndex: SpectralIndex,
    /**
     * query params of the first selected Landsat scene
     */
    queryParams4SceneA: QueryParams4ImageryScene,
    /**
     * query params of the second selected Landsat scene
     */
    queryParams4SceneB: QueryParams4ImageryScene
): Promise<RasterFunction> => {
    if (!spectralIndex) {
        return null;
    }

    if (
        !queryParams4SceneA?.objectIdOfSelectedScene ||
        !queryParams4SceneB?.objectIdOfSelectedScene
    ) {
        return null;
    }

    // Sort query parameters by acquisition date in ascending order.
    const [
        queryParams4SceneAcquiredInEarlierDate,
        queryParams4SceneAcquiredInLaterDate,
    ] = [queryParams4SceneA, queryParams4SceneB].sort((a, b) => {
        return (
            formattedDateString2Unixtimestamp(a.acquisitionDate) -
            formattedDateString2Unixtimestamp(b.acquisitionDate)
        );
    });

    try {
        // Get the band index for the selected spectral index.
        const bandIndex = getBandIndexesBySpectralIndex(spectralIndex);

        // Retrieve the feature associated with the later acquired Landsat scene.
        const feature = await getLandsatFeatureByObjectId(
            queryParams4SceneAcquiredInLaterDate?.objectIdOfSelectedScene
        );

        return new RasterFunction({
            // the Clip function clips a raster using a rectangular shape according to the extents defined,
            // or clips a raster to the shape of an input polygon feature class.
            functionName: 'Clip',
            functionArguments: {
                // a polygon or envelope
                ClippingGeometry: feature.geometry,
                // use 1 to keep image inside of the geometry
                ClippingType: 1,
                Raster: {
                    // The `Arithmetic` function performs an arithmetic operation between two rasters.
                    rasterFunction: 'Arithmetic',
                    rasterFunctionArguments: {
                        Raster: {
                            rasterFunction: 'BandArithmetic',
                            rasterFunctionArguments: {
                                Raster: `$${queryParams4SceneAcquiredInLaterDate.objectIdOfSelectedScene}`,
                                Method: 0,
                                BandIndexes: bandIndex,
                            },
                            outputPixelType: 'F32',
                        },
                        Raster2: {
                            rasterFunction: 'BandArithmetic',
                            rasterFunctionArguments: {
                                Raster: `$${queryParams4SceneAcquiredInEarlierDate.objectIdOfSelectedScene}`,
                                Method: 0,
                                BandIndexes: bandIndex,
                            },
                            outputPixelType: 'F32',
                        },
                        // 1=esriRasterPlus, 2=esriRasterMinus, 3=esriRasterMultiply, 4=esriRasterDivide, 5=esriRasterPower, 6=esriRasterMode
                        Operation: 2,
                        // default 0; 0=esriExtentFirstOf, 1=esriExtentIntersectionOf, 2=esriExtentUnionOf, 3=esriExtentLastOf
                        ExtentType: 1,
                        // 0=esriCellsizeFirstOf, 1=esriCellsizeMinOf, 2=esriCellsizeMaxOf, 3=esriCellsizeMeanOf, 4=esriCellsizeLastOf
                        CellsizeType: 0,
                    },
                    outputPixelType: 'F32',
                },
            },
        });
    } catch (err) {
        console.error(err);

        // handle any potential errors and return null in case of failure.
        return null;
    }
};

export const ChangeLayerContainer: FC<Props> = ({ mapView, groupLayer }) => {
    const dispatach = useDispatch();

    const mode = useSelector(selectAppMode);

    const spectralIndex = useSelector(
        selectSelectedOption4ChangeCompareTool
    ) as SpectralIndex;

    const changeCompareLayerIsOn = useSelector(selectChangeCompareLayerIsOn);

    const queryParams4SceneA = useSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useSelector(selectQueryParams4SecondaryScene);

    const anailysisTool = useSelector(selectActiveAnalysisTool);

    const selectedRange = useSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const fullPixelValueRange = useSelector(
        selectFullPixelValuesRangeInChangeCompareTool
    );

    const [rasterFunction, setRasterFunction] = useState<RasterFunction>();

    const isVisible = useMemo(() => {
        if (mode !== 'analysis') {
            return false;
        }

        if (anailysisTool !== 'change') {
            return false;
        }

        if (
            !queryParams4SceneA?.objectIdOfSelectedScene ||
            !queryParams4SceneB?.objectIdOfSelectedScene
        ) {
            return false;
        }

        if (!rasterFunction) {
            return false;
        }

        return changeCompareLayerIsOn;
    }, [
        mode,
        anailysisTool,
        changeCompareLayerIsOn,
        queryParams4SceneA,
        queryParams4SceneB,
        rasterFunction,
    ]);

    useEffect(() => {
        (async () => {
            const rasterFunction = await getRasterFunction4ChangeLayer(
                spectralIndex,
                queryParams4SceneA,
                queryParams4SceneB
            );

            setRasterFunction(rasterFunction);
        })();
    }, [spectralIndex, queryParams4SceneA, queryParams4SceneB]);

    // return (
    //     <ChangeLayer
    //         mapView={mapView}
    //         groupLayer={groupLayer}
    //         spectralIndex={spectralIndex}
    //         visible={isVisible}
    //         queryParams4SceneA={queryParams4SceneA}
    //         queryParams4SceneB={queryParams4SceneB}
    //         selectedRange={selectedRange}
    //     />
    // );

    useCalculateTotalAreaByPixelsCount({
        objectId:
            queryParams4SceneA?.objectIdOfSelectedScene ||
            queryParams4SceneB?.objectIdOfSelectedScene,
        serviceURL: LANDSAT_LEVEL_2_SERVICE_URL,
        pixelSize: mapView.resolution,
    });

    return (
        <ImageryLayerWithPixelFilter
            mapView={mapView}
            groupLayer={groupLayer}
            serviceURL={LANDSAT_LEVEL_2_SERVICE_URL}
            rasterFunction={rasterFunction}
            visible={isVisible}
            selectedPixelValueRange={selectedRange}
            fullPixelValueRange={fullPixelValueRange}
            getPixelColor={getPixelColor4ChangeCompareLayer}
            countOfPixelsOnChange={(totalPixels, visiblePixels) => {
                dispatach(countOfVisiblePixelsChanged(visiblePixels));
            }}
        />
    );
};
