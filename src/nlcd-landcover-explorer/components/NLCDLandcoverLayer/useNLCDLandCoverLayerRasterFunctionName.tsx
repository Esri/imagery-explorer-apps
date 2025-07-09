import { getRasterFunctionByNLCDLandCoverClassName } from '@shared/services/nlcd-landcover/classifications';
import { useAppSelector } from '@shared/store/configureStore';
import { selectActiveLandCoverType } from '@shared/store/LandcoverExplorer/selectors';
import { NLCDLandCoverClassification } from '@typing/landcover';
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
        return getRasterFunctionByNLCDLandCoverClassName(
            activeLandCoverType as NLCDLandCoverClassification
        );
    }, [activeLandCoverType]);

    return rasterFunctionName;
};
