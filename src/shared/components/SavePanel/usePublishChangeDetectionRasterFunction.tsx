import {
    createChangeDetectionRasterFunction,
    createClipRasterFunction,
    createMaskIndexRasterFunction,
} from '@shared/services/raster-analysis/rasterFunctions';
import {
    selectQueryParams4MainScene,
    // selectQueryParams4SceneInSelectedMode,
    // selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectMaskLayerPixelValueRange,
    selectSelectedIndex4MaskTool,
} from '@shared/store/MaskTool/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import { getBandIndexesBySpectralIndex } from '@shared/services/landsat-level-2/helpers';
import { getLandsatFeatureByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
import { Extent, Geometry } from '@arcgis/core/geometry';
import {
    selectFullPixelValuesRangeInChangeCompareTool,
    selectSelectedOption4ChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { useObjectIds4ChangeDetectionTool } from '@shared/components/ChangeCompareLayer/useObjectIds4ChangeDetectionTool';

import { useLandsatMaskToolFullPixelValueRange } from '../../../landsat-explorer/components/MaskTool/useLandsatMaskToolFullPixelValueRange';
import { RasterFunctionsByPublishJobType } from '@shared/components/SavePanel/SavePanelContainer';

type Props = {
    originalServiceUrl: string;
    clippingGeometry: Geometry;
    token: string;
};

export const usePublishChangeDetectionRasterFunction = ({
    originalServiceUrl,
    clippingGeometry,
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

    const spectralIndex4ChangeDetection = useSelector(
        selectSelectedOption4ChangeCompareTool
    ) as SpectralIndex;

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
            objectId4EarlierScene: objectIdOfSelectedSceneInEarlierDate,
            objectId4LaterScene: objectIdOfSelectedSceneInLater,
            token,
            bandIndexes: getBandIndexesBySpectralIndex(
                spectralIndex4ChangeDetection
            ),
            clippingGeometry,
            pixelValueRange: selectedRange4ChangeDetectionTool,
            fullPixelValueRange: changeDetectionToolFullPixelValueRange,
        });
    }, [
        clippingGeometry,
        objectIdOfSelectedSceneInEarlierDate,
        objectIdOfSelectedSceneInLater,
        changeDetectionToolFullPixelValueRange,
        selectedRange4ChangeDetectionTool,
        spectralIndex4ChangeDetection,
    ]);

    return rasterFunction;
};
