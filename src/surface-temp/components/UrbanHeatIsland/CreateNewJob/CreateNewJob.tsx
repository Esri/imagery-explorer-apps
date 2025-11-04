import { CalciteButton, CalciteIcon } from '@esri/calcite-components-react';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectSelectedUrbanAreaFeature } from '@shared/store/UrbanHeatIslandTool/selectors';
import React, { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';

/**
 * The header for each section in CreateNewJob component
 * @param param0
 * @returns
 */
const SectionHeader: FC<{ icon: string; text: string }> = ({ icon, text }) => (
    <div className="flex opacity-50 mb-4">
        <CalciteIcon icon={icon} scale="s" className="mr-1" />
        <span className="text-sm ">{text}</span>
    </div>
);

const SectionContent: FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="grow">{children}</div>
);

export const CreateNewJob = () => {
    const { t } = useTranslation();

    const selectedFeature = useAppSelector(selectSelectedUrbanAreaFeature);
    return (
        <div className="flex justify-between w-full h-full">
            <div className="w-1/3 h-full px-2 mr-2 flex flex-col">
                {/* <div className="flex opacity-50 mb-2">
                    <CalciteIcon icon="pin" scale="s" className="mr-1" />
                    <span className="text-sm ">
                        {t('choose_aoi_polygon', { ns: APP_NAME })}
                    </span>
                </div> */}
                <SectionHeader
                    icon="pin"
                    text={t('choose_aoi_polygon', { ns: APP_NAME })}
                />

                <SectionContent>
                    {selectedFeature ? (
                        <div className="text-sm text-opacity-80">
                            {/* <span className="font-medium">
                                {selectedFeature.NAME ||
                                    selectedFeature.ALL_NAMES}
                            </span> */}
                            <Trans
                                i18nKey="selected_aoi_polygon"
                                ns={APP_NAME}
                                components={{
                                    strong: (
                                        <strong className="font-bold text-opacity-100" />
                                    ),
                                }}
                                values={{
                                    name:
                                        selectedFeature.NAME ||
                                        selectedFeature.ALL_NAMES,
                                    country: selectedFeature.COUNTRY,
                                }}
                            />
                        </div>
                    ) : (
                        <p className="italic opacity-50 text-xs mt-2">
                            {t('no_aoi_polygon_selected', { ns: APP_NAME })}
                        </p>
                    )}
                </SectionContent>
            </div>

            <div className="w-1/3 h-full px-2 mr-2 flex flex-col">
                {/* <div className="flex opacity-50">
                    <CalciteIcon icon="calendar" scale="s" className="mr-1" />
                    <span className="text-sm ">
                        {t('choose_months', { ns: APP_NAME })}
                    </span>
                </div> */}
                <SectionHeader
                    icon="calendar"
                    text={t('choose_months', { ns: APP_NAME })}
                />

                <SectionContent>Month selector goes here</SectionContent>
            </div>

            <div className="w-1/3 h-full px-2 flex flex-col">
                {/* <div className="flex opacity-50">
                    <CalciteIcon icon="heat-chart" scale="s" className="mr-1" />
                    <span className="text-sm ">
                        {t('start_new_siuhi_analysis', { ns: APP_NAME })}
                    </span>
                </div> */}
                <SectionHeader
                    icon="heat-chart"
                    text={t('start_new_siuhi_analysis', { ns: APP_NAME })}
                />

                <SectionContent>
                    <div
                        style={
                            {
                                '--calcite-button-border-color':
                                    'var(--custom-light-blue-90)',
                                '--calcite-button-text-color':
                                    'var(--custom-light-blue)',
                            } as React.CSSProperties
                        }
                    >
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
                </SectionContent>
            </div>
        </div>
    );
};
