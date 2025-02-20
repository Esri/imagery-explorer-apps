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

import { createChangeDetectionRasterFunction } from '@shared/services/raster-analysis/rasterFunctions';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { Extent, Geometry } from '@arcgis/core/geometry';
import {
    selectFullPixelValuesRangeInChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { useObjectIds4ChangeDetectionTool } from '@shared/components/ChangeCompareLayer/useObjectIds4ChangeDetectionTool';

type Props = {
    originalServiceUrl: string;
    clippingGeometry: Geometry;
    bandIndexes?: string;
    rasterFunctionName?: string;
    logDiff?: boolean;
    token: string;
};

export const usePublishChangeDetectionRasterFunction = ({
    originalServiceUrl,
    clippingGeometry,
    bandIndexes,
    rasterFunctionName,
    logDiff,
    token,
}: Props) => {
    const changeDetectionToolFullPixelValueRange = useAppSelector(
        selectFullPixelValuesRangeInChangeCompareTool
    );

    const selectedRange4ChangeDetectionTool = useAppSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const [
        objectIdOfSelectedSceneInEarlierDate,
        objectIdOfSelectedSceneInLater,
    ] = useObjectIds4ChangeDetectionTool();

    const rasterFunction = useMemo(() => {
        if (
            !objectIdOfSelectedSceneInEarlierDate ||
            !objectIdOfSelectedSceneInLater ||
            !clippingGeometry
        ) {
            return null;
        }

        return createChangeDetectionRasterFunction({
            serviceUrl: originalServiceUrl,
            token,
            objectId4EarlierScene: objectIdOfSelectedSceneInEarlierDate,
            objectId4LaterScene: objectIdOfSelectedSceneInLater,
            bandIndexes,
            rasterFunctionTemplate: rasterFunctionName,
            clippingGeometry,
            pixelValueRange: selectedRange4ChangeDetectionTool,
            fullPixelValueRange: changeDetectionToolFullPixelValueRange,
            logDiff,
        });
    }, [
        clippingGeometry,
        objectIdOfSelectedSceneInEarlierDate,
        objectIdOfSelectedSceneInLater,
        changeDetectionToolFullPixelValueRange,
        selectedRange4ChangeDetectionTool,
        bandIndexes,
        rasterFunctionName,
        logDiff,
    ]);

    return rasterFunction;
};
