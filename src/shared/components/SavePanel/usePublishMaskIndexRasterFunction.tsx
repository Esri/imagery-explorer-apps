import { createMaskIndexRasterFunction } from '@shared/services/raster-analysis/rasterFunctions';
import { selectQueryParams4MainScene } from '@shared/store/ImageryScene/selectors';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { selectMaskLayerPixelValueRange } from '@shared/store/MaskTool/selectors';
import { Extent, Geometry } from '@arcgis/core/geometry';

type Props = {
    originalServiceUrl: string;
    clippingGeometry: Geometry;
    fullPixelValueRange: number[];
    bandIndexes?: string;
    rasterFunctionName?: string;
    token: string;
};

export const usePublishMaskIndexRasterFunction = ({
    originalServiceUrl,
    clippingGeometry,
    fullPixelValueRange,
    bandIndexes,
    rasterFunctionName,
    token,
}: Props) => {
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const { selectedRange } = useAppSelector(selectMaskLayerPixelValueRange);

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
            bandIndexes, //getBandIndexesBySpectralIndex(spectralIndex4MaskTool),
            rasterFunctionTemplate: rasterFunctionName,
            pixelValueRange: selectedRange,
            fullPixelValueRange,
            clippingGeometry,
        });
    }, [
        clippingGeometry,
        queryParams4MainScene?.objectIdOfSelectedScene,
        rasterFunctionName,
        bandIndexes,
        selectedRange,
        fullPixelValueRange,
    ]);

    return rasterFunction;
};
