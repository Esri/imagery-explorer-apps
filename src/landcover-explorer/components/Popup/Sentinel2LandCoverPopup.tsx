import MapView from '@arcgis/core/views/MapView';
import React, { FC, useMemo } from 'react';
import Popup from './Popup';
// import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import {
    // DEFAULT_RENDERING_RULE,
    SENTINEL2_LANDCOVER_10M_END_YEAR_FIELD,
    SENTINEL2_LANDCOVER_DEFAULT_RASTER_FUNCTION,
    SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
} from '@shared/services/sentinel-2-10m-landcover/config';
import { sentinel2LandcoverClassificationDataMap } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { SENTINEL_2_SERVICE_URL } from '@shared/services/sentinel-2/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAvaiableYearsForLandCoverLayer } from '@shared/store/LandcoverExplorer/selectors';

type Props = {
    mapView?: MapView;
};

export const Sentinel2LandCoverPopup: FC<Props> = ({ mapView }) => {
    // const years = useMemo(() => {
    //     return getAvailableYears();
    // }, []);

    const years = useAppSelector(selectAvaiableYearsForLandCoverLayer);

    if (!mapView) {
        return null;
    }

    return (
        <Popup
            landCoverServiceUrl={SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL}
            satelliteImageryServiceUrl={SENTINEL_2_SERVICE_URL}
            satelliteImageryServiceName="Sentinel-2 L2A"
            rasterFunction={SENTINEL2_LANDCOVER_DEFAULT_RASTER_FUNCTION}
            years={years}
            yearField={SENTINEL2_LANDCOVER_10M_END_YEAR_FIELD}
            classificationDataMap={sentinel2LandcoverClassificationDataMap}
            mapView={mapView}
        />
    );
};
