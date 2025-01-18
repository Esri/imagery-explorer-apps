import { Geometry } from '@arcgis/core/geometry';
import { createClipRasterFunction } from '@shared/services/raster-analysis/rasterFunctions';
import { selectQueryParams4MainScene } from '@shared/store/ImageryScene/selectors';
import React, { useEffect, useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

type Props = {
    originalServiceUrl: string;
    clippingGeometry: Geometry;
    token: string;
};

export const usePublishSceneRasterFunction = ({
    originalServiceUrl,
    clippingGeometry,
    token,
}: Props) => {
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const rasterFunction = useMemo(() => {
        if (
            !queryParams4MainScene ||
            !queryParams4MainScene?.objectIdOfSelectedScene ||
            !clippingGeometry
        ) {
            return null;
        }

        return createClipRasterFunction({
            serviceUrl: originalServiceUrl,
            objectId: queryParams4MainScene?.objectIdOfSelectedScene,
            token,
            clippingGeometry,
        });
    }, [clippingGeometry, queryParams4MainScene?.objectIdOfSelectedScene]);

    return rasterFunction;
};
