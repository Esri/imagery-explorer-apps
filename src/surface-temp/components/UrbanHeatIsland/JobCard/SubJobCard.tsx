import { APP_NAME } from '@shared/config';
import { SIUHIAnalysisSubJob } from '@shared/store/UrbanHeatIslandTool/reducer';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SIUHIAnalysisJobCardContainerClassName } from './JobCard';
import { CalciteLoader } from '@esri/calcite-components-react';

type SubJobCardProps = {
    /**
     * Data for the sub job
     */
    subJobData: SIUHIAnalysisSubJob;
    /**
     * Title for the sub job card
     */
    title: string;
};

export const SubJobCard: FC<SubJobCardProps> = ({ subJobData, title }) => {
    const { t } = useTranslation();

    const getSubJobStatusContent = () => {
        if (!subJobData || subJobData.status === 'waiting to start') {
            return (
                <div className="opacity-50 text-center w-full text-xs">
                    {t('sub_job_not_started', { ns: APP_NAME })}
                </div>
            );
        }

        if (subJobData.status === 'in progress') {
            const message = t('sub_job_in_progress', {
                ns: APP_NAME,
                time: new Date(subJobData.startedAt || 0).toLocaleString(),
            });
            return (
                <div
                    className="w-full py-2 flex justify-center"
                    style={{
                        '--calcite-loader-spacing': '0px',
                        '--calcite-loader-text-color':
                            'var(--custom-light-blue-50)',
                    }}
                >
                    <CalciteLoader scale="s" text={message} />
                </div>
            );
        }

        return (
            <div>
                <div>Status: {subJobData.status}</div>
            </div>
        );
    };

    return (
        <div className={SIUHIAnalysisJobCardContainerClassName}>
            <div className="font-medium mb-2 opacity-50">{title}</div>
            <div className="text-sm">{getSubJobStatusContent()}</div>
        </div>
    );
};
