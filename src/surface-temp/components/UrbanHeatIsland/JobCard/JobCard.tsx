import { CalciteButton, CalciteLoader } from '@esri/calcite-components-react';
import { APP_NAME } from '@shared/config';
import { PublishAndDownloadJobStatus } from '@shared/store/PublishAndDownloadJobs/reducer';
import { SIUHIAnalysisJob } from '@shared/store/UrbanHeatIslandTool/reducer';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    jobData: SIUHIAnalysisJob;
    /**
     * Emit when the accept credits button is clicked
     * @returns void
     */
    acceptCreditsButtonOnClick?: () => void;
    /**
     * Emit when the reject credits button is clicked
     * @returns void
     */
    rejectCreditsButtonOnClick?: () => void;
    /**
     * emit when the remove job button is clicked
     * @returns
     */
    removeJobButtonOnClick: () => void;
};

export const SIUHIAnalysisJobCardContainerClassName =
    'border border-custom-light-blue-20 p-4 mb-4';

export const JobCard: FC<Props> = ({
    jobData,
    acceptCreditsButtonOnClick,
    rejectCreditsButtonOnClick,
    removeJobButtonOnClick,
}) => {
    const { t } = useTranslation();

    const { jobCost } = jobData || {};

    const getContent = () => {
        if (
            jobData?.status === PublishAndDownloadJobStatus.Failed ||
            jobData?.status === PublishAndDownloadJobStatus.Cancelled ||
            jobData?.jobCost?.status === PublishAndDownloadJobStatus.Failed ||
            jobData?.jobCost?.status === PublishAndDownloadJobStatus.Cancelled
        ) {
            let errorMessage = t('job_failed_message', {
                ns: APP_NAME,
                error: jobData?.errorMessage,
            });

            if (
                jobData?.jobCost?.status ===
                PublishAndDownloadJobStatus.Cancelled
            ) {
                errorMessage = t('credits_rejection_message', { ns: APP_NAME });
            }

            return (
                <div className="text-xs mb-2">
                    <p className="opacity-50 mb-2">{errorMessage}</p>

                    <CalciteButton
                        scale="s"
                        appearance="outline"
                        kind="neutral"
                        onClick={removeJobButtonOnClick}
                    >
                        {t('remove_job', { ns: APP_NAME })}
                    </CalciteButton>
                </div>
            );
        }

        return (
            <>
                <div className="text-xs">
                    <table className="table-auto mb-2 text-xs w-full">
                        <tbody>
                            {/* <tr>
                                <td className="opacity-70">
                                    {t('created_at', { ns: APP_NAME })}:
                                </td>
                                <td>
                                    {new Date(
                                        jobData.createdAt
                                    ).toLocaleString()}
                                </td>
                            </tr> */}
                            <tr>
                                <td className="opacity-70">
                                    {t('aoi', { ns: APP_NAME })}:
                                </td>
                                <td>
                                    {jobData.inputParams.urbanAreaFeature.NAME}
                                </td>
                            </tr>
                            <tr>
                                <td className="opacity-70">
                                    {t('time_range', { ns: APP_NAME })}:
                                </td>
                                <td>
                                    {t('selected_time_range', {
                                        ns: APP_NAME,
                                        months: jobData.inputParams.months.join(
                                            ','
                                        ),
                                        year: jobData.inputParams.year,
                                    })}
                                </td>
                            </tr>

                            {jobCost &&
                                jobCost?.status ===
                                    PublishAndDownloadJobStatus.Succeeded && (
                                    <tr>
                                        <td className="opacity-70">
                                            {t('total_cost', { ns: APP_NAME })}:
                                        </td>
                                        <td>
                                            {jobCost.estimatedCredits}{' '}
                                            {t('credits', { ns: APP_NAME })}
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>

                {acceptCreditsButtonOnClick &&
                    rejectCreditsButtonOnClick &&
                    jobCost?.status ===
                        PublishAndDownloadJobStatus.PendingUserApprovalForActualCost && (
                        <>
                            <p className="text-xs">
                                {t('total_cost_summary', {
                                    ns: APP_NAME,
                                    credits: jobCost.estimatedCredits,
                                })}
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                                <CalciteButton
                                    scale="s"
                                    // width="full"
                                    appearance="outline"
                                    kind="neutral"
                                    // iconEnd='check'
                                    onClick={acceptCreditsButtonOnClick}
                                >
                                    {t('accept_credits', { ns: APP_NAME })}
                                </CalciteButton>

                                <CalciteButton
                                    scale="s"
                                    appearance="outline"
                                    kind="neutral"
                                    // width="full"
                                    // iconEnd='x'
                                    onClick={rejectCreditsButtonOnClick}
                                >
                                    {t('reject_credits', { ns: APP_NAME })}
                                </CalciteButton>
                            </div>
                        </>
                    )}

                {jobCost?.status ===
                    PublishAndDownloadJobStatus.PendingCheckingCost && (
                    <div className="opacity-50 w-full text-sm mt-2 flex items-center">
                        <CalciteLoader inline scale="m" />
                        <span className="ml-1">
                            {t('credit_estimation_pending', { ns: APP_NAME })}
                        </span>
                    </div>
                )}
            </>
        );
    };

    if (!jobData) {
        return null;
    }

    return (
        <div
            className={SIUHIAnalysisJobCardContainerClassName}
            style={
                {
                    '--calcite-button-border-color':
                        'var(--custom-light-blue-90)',
                    '--calcite-button-text-color': 'var(--custom-light-blue)',
                } as React.CSSProperties
            }
        >
            <div className="font-medium mb-2 opacity-50">
                {t('job_info', { ns: APP_NAME })}
            </div>
            {getContent()}
        </div>
    );
};
