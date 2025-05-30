import { NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME } from '@shared/services/nlcd-landcover/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectActiveLandCoverType } from '@shared/store/LandcoverExplorer/selectors';
import React, { useMemo } from 'react';

/**
 * This hook returns the raster function name for the NLCD land cover layer based on the currently selected land cover type.
 *
 * @returns {string} The name of the raster function to be used for the NLCD land cover layer.
 *
 * @see https://di-nlcddev.img.arcgis.com/arcgis/rest/services/USA_NLCD_Annual_LandCover/ImageServer/rasterFunctionInfos
 */
export const useNLCDLandCoverLayerRasterFunctionName = () => {
    const activeLandCoverType = useAppSelector(selectActiveLandCoverType);

    const rasterFunctionName = useMemo(() => {
        // return getRasterFunctionByLandCoverClassName(activeLandCoverType);
        return NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME;
    }, [activeLandCoverType]);

    return rasterFunctionName;
};
