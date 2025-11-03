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
        <div className="min-w-[400px]">
            <div>
                <span className="uppercas">
                    {t('create_new_urban_heat_island_analysis', {
                        ns: APP_NAME,
                    })}
                </span>
            </div>

            <div className="mb-1">
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

            <div></div>

            <div
                className="flex items-center"
                style={
                    {
                        // '--calcite-button-border-color': 'var(--custom-light-blue-90)',
                        '--calcite-button-text-color':
                            'var(--custom-light-blue)',
                    } as React.CSSProperties
                }
            >
                <div className="mr-2">
                    <CalciteButton
                        appearance="transparent"
                        scale="m"
                        iconStart="plus"
                    >
                        {t('create_new_job', { ns: APP_NAME })}
                    </CalciteButton>
                </div>

                <CalciteButton
                    appearance="transparent"
                    scale="s"
                    iconEnd="reset"
                    round
                >
                    {/* {t('reset', { ns: APP_NAME })} */}
                </CalciteButton>
            </div>
        </div>
    );
};
