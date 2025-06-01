import { getRasterFunctionBySentinel2LandCoverClassName } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { useAppSelector } from '@shared/store/configureStore';
import { selectActiveLandCoverType } from '@shared/store/LandcoverExplorer/selectors';
import { Sentinel2LandCoverClassification } from '@typing/landcover';
import React, { useMemo } from 'react';

export const useSentinel2LandCoverLayerRasterFunctionName = () => {
    const activeLandCoverType = useAppSelector(selectActiveLandCoverType);

    const rasterFunctionName = useMemo(() => {
        return getRasterFunctionBySentinel2LandCoverClassName(
            activeLandCoverType as Sentinel2LandCoverClassification
        );
    }, [activeLandCoverType]);

    return rasterFunctionName;
};
