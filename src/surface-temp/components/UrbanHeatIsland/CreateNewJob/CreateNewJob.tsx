import { CalciteButton, CalciteIcon } from '@esri/calcite-components-react';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectSelectedUrbanAreaFeature } from '@shared/store/UrbanHeatIslandTool/selectors';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const CreateNewJob = () => {
    const { t } = useTranslation();

    const selectedFeature = useAppSelector(selectSelectedUrbanAreaFeature);
    return (
        <div className="flex justify-between w-full h-full">
            <div className="w-1/3 h-full pr-2 mr-2">
                <div className="flex opacity-50">
                    <CalciteIcon icon="pin" scale="s" className="mr-1" />
                    <span className="text-sm ">
                        {t('choose_aoi_polygon', { ns: APP_NAME })}
                    </span>
                </div>

                <div className="">
                    {selectedFeature ? (
                        <div className="flex items-center">
                            <span className="font-medium">
                                {selectedFeature.NAME ||
                                    selectedFeature.ALL_NAMES}
                            </span>
                        </div>
                    ) : (
                        <span className="italic opacity-50 text-xs ">
                            {t('no_aoi_polygon_selected', { ns: APP_NAME })}
                        </span>
                    )}
                </div>
            </div>

            <div className="w-1/3 h-full pr-2 mr-2">
                <div className="flex opacity-50">
                    <CalciteIcon icon="calendar" scale="s" className="mr-1" />
                    <span className="text-sm ">
                        {t('choose_months', { ns: APP_NAME })}
                    </span>
                </div>
            </div>

            <div
                className="w-1/3"
                style={
                    {
                        '--calcite-button-border-color':
                            'var(--custom-light-blue-90)',
                        '--calcite-button-text-color':
                            'var(--custom-light-blue)',
                    } as React.CSSProperties
                }
            >
                <div className="flex opacity-50">
                    <CalciteIcon icon="heat-chart" scale="s" className="mr-1" />
                    <span className="text-sm ">
                        {t('start_new_siuhi_analysis', { ns: APP_NAME })}
                    </span>
                </div>

                <CalciteButton
                    appearance="outline"
                    scale="m"
                    width="full"
                    iconStart="plus"
                    className="mb-2"
                >
                    {t('create_new_job', { ns: APP_NAME })}
                </CalciteButton>

                <CalciteButton
                    appearance="outline"
                    scale="m"
                    iconStart="reset"
                    width="full"
                >
                    {t('reset', { ns: APP_NAME })}
                </CalciteButton>
            </div>
        </div>
    );
};
