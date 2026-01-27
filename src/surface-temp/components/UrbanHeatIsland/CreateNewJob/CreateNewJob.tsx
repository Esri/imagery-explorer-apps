import { CalciteButton, CalciteIcon } from '@esri/calcite-components-react';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectSelectedUrbanAreaFeature } from '@shared/store/UrbanHeatIslandTool/selectors';
import React, { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { SelectAOIPolygon } from './SelectAOIPolygon';
import { SelectYearAndMonth } from './SelectYearAndMonth';
import { ConfirmAndStartNewJob } from './ConfirmAndStartNewJob';

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

const GridCardContainerClassName =
    'flex flex-col border border-custom-light-blue-20 p-4';

export const CreateNewJob = () => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-3 gap-4 w-full h-full">
            <div className={GridCardContainerClassName}>
                <SectionHeader
                    icon="pin"
                    text={t('choose_aoi_polygon', { ns: APP_NAME })}
                />

                <SectionContent>
                    <SelectAOIPolygon />
                </SectionContent>
            </div>

            <div className={GridCardContainerClassName}>
                <SectionHeader
                    icon="calendar"
                    text={t('choose_month_and_year', { ns: APP_NAME })}
                />

                <SectionContent>
                    <SelectYearAndMonth />
                </SectionContent>
            </div>

            <div className={GridCardContainerClassName}>
                <SectionHeader
                    icon="heat-chart"
                    text={t('start_new_siuhi_analysis', { ns: APP_NAME })}
                />

                <SectionContent>
                    <ConfirmAndStartNewJob />
                </SectionContent>
            </div>
        </div>
    );
};
