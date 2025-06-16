import React from 'react';
import { SaveWebMapContainer } from './SaveWebMapContainer';

import {
    NLCD_LANDCOVER_IMAGE_SERVICE_URL,
    NLCD_LANDCOVER_ITEM_ID,
    NLCD_LANDCOVER_START_TIME_FIELD,
} from '@shared/services/nlcd-landcover/config';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';

export const NLCDLandCoverSaveWebMap = () => {
    const years = getAvailableYears();

    return (
        <SaveWebMapContainer
            years={years}
            landCoverLayerTitle="NLCD 30m Land Use/Land Cover Time Series"
            landCoverLayerItemId={NLCD_LANDCOVER_ITEM_ID}
            landCoverImageryServiceUrl={NLCD_LANDCOVER_IMAGE_SERVICE_URL}
            landCoverLayerStartTimeField={NLCD_LANDCOVER_START_TIME_FIELD}
            landCoverLayerStartTimeFieldType="number"
            authoringApp="NLCD Land Cover Explorer"
        />
    );
};
