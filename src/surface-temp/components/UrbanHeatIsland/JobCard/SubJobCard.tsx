import { AGOL_PORTAL_ROOT, APP_NAME } from '@shared/config';
import { SIUHIAnalysisSubJob } from '@shared/store/UrbanHeatIslandTool/reducer';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SIUHIAnalysisJobCardContainerClassName } from './JobCard';
import {
    CalciteButton,
    CalciteIcon,
    CalciteLoader,
} from '@esri/calcite-components-react';
import { PublishAndDownloadJobStatus } from '@shared/store/PublishAndDownloadJobs/reducer';

type SubJobCardProps = {
    /**
     * Data for the sub job
     */
    subJobData: SIUHIAnalysisSubJob;
    /**
     * Title for the sub job card
     */
    title: string;
    /**
     * If true, show the "Open Item" button
     */
    shouldShowOpenItemButton?: boolean;
};

export const SubJobCard: FC<SubJobCardProps> = ({
    subJobData,
    title,
    shouldShowOpenItemButton,
}) => {
    const { t } = useTranslation();

    const getSubJobStatusContent = () => {
        if (
            !subJobData ||
            subJobData.status === PublishAndDownloadJobStatus.Waiting
        ) {
            return (
                <div className="opacity-50 text-center w-full text-xs">
                    {t('sub_job_not_started', { ns: APP_NAME })}
                </div>
            );
        }

        if (
            subJobData.status === PublishAndDownloadJobStatus.Executing ||
            subJobData.status === PublishAndDownloadJobStatus.New
        ) {
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

        if (
            subJobData.status === PublishAndDownloadJobStatus.Failed ||
            subJobData.status === PublishAndDownloadJobStatus.Cancelled ||
            subJobData.status === PublishAndDownloadJobStatus.TimedOut ||
            subJobData.status === PublishAndDownloadJobStatus.Expired
        ) {
            return (
                <div className="text-xs text-center text-red-500">
                    <div className="mb-1 w-full text-center">
                        <CalciteIcon icon="exclamation-mark-circle" />
                    </div>

                    <p>
                        {t('sub_job_failed', {
                            ns: APP_NAME,
                            error: subJobData.errorMessage || '',
                        })}
                    </p>
                </div>
            );
        }

        return (
            <div className="text-xs  text-center">
                <div className="mb-1 w-full text-center text-green-500">
                    <CalciteIcon icon="check-circle" />
                </div>

                {shouldShowOpenItemButton && subJobData.outputItemId ? (
                    <div
                        className="mt-2 w-full"
                        style={{
                            '--calcite-button-background-color':
                                'var(--calcite-color-status-success)',
                        }}
                    >
                        <CalciteButton
                            width="full"
                            scale="s"
                            href={`${AGOL_PORTAL_ROOT}/home/item.html?id=${subJobData.outputItemId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            iconEnd="launch"
                        >
                            {t('view_result_item', { ns: APP_NAME })}
                        </CalciteButton>
                    </div>
                ) : (
                    <p>{t('sub_job_completed', { ns: APP_NAME })}</p>
                )}
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
