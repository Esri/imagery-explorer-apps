import React from 'react';
import { SaveWebMapContainer } from './SaveWebMapContainer';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import {
    SENTINEL2_LANDCOVER_10M_START_TIME_FIELD,
    SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
} from '@shared/services/sentinel-2-10m-landcover/config';
import {
    SENTINEL_2_10M_LAND_COVER_ITEM_ID,
    // WEB_MAP_ID,
} from '@landcover-explorer/constants/map';

export const Sentinel2LandCoverSaveWebMap = () => {
    const years = getAvailableYears();

    return (
        <SaveWebMapContainer
            years={years}
            landCoverLayerTitle="Sentinel-2 10m Land Use/Land Cover Time Series"
            landCoverLayerItemId={SENTINEL_2_10M_LAND_COVER_ITEM_ID}
            landCoverImageryServiceUrl={
                SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL
            }
            landCoverLayerStartTimeField={
                SENTINEL2_LANDCOVER_10M_START_TIME_FIELD
            }
            landCoverLayerStartTimeFieldType="date"
            authoringApp="Sentinel-2 Land Cover Explorer"
        />
    );
};
