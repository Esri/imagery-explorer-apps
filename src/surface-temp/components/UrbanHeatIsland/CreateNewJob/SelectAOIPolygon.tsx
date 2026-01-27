import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectSelectedUrbanAreaFeature } from '@shared/store/UrbanHeatIslandTool/selectors';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

export const SelectAOIPolygon = () => {
    const { t } = useTranslation();

    const selectedFeature = useAppSelector(selectSelectedUrbanAreaFeature);

    if (!selectedFeature) {
        return (
            <p className="italic opacity-50 text-xs mt-2">
                {t('no_aoi_polygon_selected', { ns: APP_NAME })}
            </p>
        );
    }

    return (
        <div className="text-xs text-opacity-80">
            {/* <span className="font-medium">
                {selectedFeature.NAME ||
                    selectedFeature.ALL_NAMES}
            </span> */}
            <Trans
                i18nKey="selected_aoi_polygon"
                ns={APP_NAME}
                components={{
                    strong: <strong className="font-bold text-opacity-100" />,
                }}
                values={{
                    name: selectedFeature.NAME || selectedFeature.ALL_NAMES,
                    country: selectedFeature.COUNTRY,
                }}
            />
        </div>
    );
};
