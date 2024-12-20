import { createMaskIndexRasterFunction } from '@shared/services/raster-analysis/rasterFunctions';
import {
    selectQueryParams4MainScene,
    // selectQueryParams4SceneInSelectedMode,
    // selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectMaskLayerPixelValueRange,
    selectSelectedIndex4MaskTool,
} from '@shared/store/MaskTool/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import { getBandIndexesBySpectralIndex } from '@shared/services/landsat-level-2/helpers';
import { Extent, Geometry } from '@arcgis/core/geometry';

import { useLandsatMaskToolFullPixelValueRange } from '../../../landsat-explorer/components/MaskTool/useLandsatMaskToolFullPixelValueRange';

type Props = {
    originalServiceUrl: string;
    clippingGeometry: Geometry;
    token: string;
};

export const usePublishMaskIndexRasterFunction = ({
    originalServiceUrl,
    clippingGeometry,
    token,
}: Props) => {
    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const { selectedRange } = useSelector(selectMaskLayerPixelValueRange);

    const maskToolFullPixelValueRange = useLandsatMaskToolFullPixelValueRange();

    const spectralIndex4MaskTool = useSelector(
        selectSelectedIndex4MaskTool
    ) as SpectralIndex;

    const rasterFunction = useMemo(() => {
        if (
            !queryParams4MainScene ||
            !queryParams4MainScene?.objectIdOfSelectedScene ||
            !clippingGeometry
        ) {
            return null;
        }

        return createMaskIndexRasterFunction({
            serviceUrl: originalServiceUrl,
            objectId: queryParams4MainScene?.objectIdOfSelectedScene,
            token,
            bandIndexes: getBandIndexesBySpectralIndex(spectralIndex4MaskTool),
            pixelValueRange: selectedRange,
            fullPixelValueRange: maskToolFullPixelValueRange,
            clippingGeometry,
        });
    }, [
        clippingGeometry,
        queryParams4MainScene?.objectIdOfSelectedScene,
        spectralIndex4MaskTool,
        selectedRange,
        maskToolFullPixelValueRange,
    ]);

    return rasterFunction;
};
