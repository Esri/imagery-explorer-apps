import MapView from '@arcgis/core/views/MapView';
import React, { FC, useMemo } from 'react';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import Popup from '@landcover-explorer/components/Popup/Popup';
import {
    NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME,
    NLCD_LANDCOVER_IMAGE_SERVICE_URL,
    NLCD_LANDCOVER_YEAR_FIELD,
} from '@shared/services/nlcd-landcover/config';
import { nlcdLandcoverClassificationDataMap } from '@shared/services/nlcd-landcover/classifications';
type Props = {
    mapView?: MapView;
};

export const NLCDLandCoverPopup: FC<Props> = ({ mapView }) => {
    const years = useMemo(() => {
        return getAvailableYears();
    }, []);

    if (!mapView) {
        return null;
    }

    return (
        <Popup
            landCoverServiceUrl={NLCD_LANDCOVER_IMAGE_SERVICE_URL}
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
