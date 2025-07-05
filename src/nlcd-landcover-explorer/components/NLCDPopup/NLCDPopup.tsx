import MapView from '@arcgis/core/views/MapView';
import React, { FC, useMemo } from 'react';
// import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import Popup from '@landcover-explorer/components/Popup/Popup';
import {
    NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME,
    NLCD_LANDCOVER_IMAGE_SERVICE_URL,
    NLCD_LANDCOVER_YEAR_FIELD,
} from '@shared/services/nlcd-landcover/config';
import { nlcdLandcoverClassificationDataMap } from '@shared/services/nlcd-landcover/classifications';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAvaiableYearsForLandCoverLayer } from '@shared/store/LandcoverExplorer/selectors';
type Props = {
    mapView?: MapView;
};

export const NLCDLandCoverPopup: FC<Props> = ({ mapView }) => {
    // const years = useMemo(() => {
    //     return getAvailableYears();
    // }, []);
    const years = useAppSelector(selectAvaiableYearsForLandCoverLayer);

    if (!mapView) {
        return null;
    }

    return (
        <Popup
            landCoverServiceUrl={NLCD_LANDCOVER_IMAGE_SERVICE_URL}
            satelliteImageryServiceUrl={LANDSAT_LEVEL_2_SERVICE_URL}
            satelliteImageryServiceName="Landsat Level-2"
            rasterFunction={
                NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME
            }
            years={years}
            yearField={NLCD_LANDCOVER_YEAR_FIELD}
            classificationDataMap={nlcdLandcoverClassificationDataMap}
            mapView={mapView}
        />
    );
};
