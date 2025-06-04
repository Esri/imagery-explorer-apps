import { APP_NAME } from '@shared/config';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LandcoverTimeSelectorContainer } from '@landcover-explorer/components/TimeSelector';

export const NLCDTimeSelector = () => {
    const { t } = useTranslation();

    return (
        <LandcoverTimeSelectorContainer
            title4Imagery={t('landsat_layer_title', { ns: APP_NAME })}
            title4LandCover={t('land_cover_layer_title', { ns: APP_NAME })}
            showDownloadGeoTIFFButton={false}
            satelliteName="Landsat"
        />
    );
};
