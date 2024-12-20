import { createChangeDetectionRasterFunction } from '@shared/services/raster-analysis/rasterFunctions';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
    const changeDetectionToolFullPixelValueRange = useSelector(
        selectFullPixelValuesRangeInChangeCompareTool
    );

    const selectedRange4ChangeDetectionTool = useSelector(
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
