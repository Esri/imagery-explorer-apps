import {
    CalciteButton,
    CalciteInputText,
    CalciteLabel,
} from '@esri/calcite-components-react';
import { APP_NAME } from '@shared/config';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { urbanHeatIslandToolFiltersReset } from '@shared/store/UrbanHeatIslandTool/reducer';
import {
    selectFailedToCreateJobErrorMessage,
    selectHasPendingSIUHIAnalysisJob,
    selectShouldDisableCreateJobButton,
} from '@shared/store/UrbanHeatIslandTool/selectors';
import { createNewSIUHIAnalysisJob } from '@shared/store/UrbanHeatIslandTool/thunks';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ConfirmAndStartNewJob = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const shouldDisableCreateJobButton = useAppSelector(
        selectShouldDisableCreateJobButton
    );

    const failedToCreateJobErrorMessage = useAppSelector(
        selectFailedToCreateJobErrorMessage
    );

    const hasPendingSIUHIAnalysisJob = useAppSelector(
        selectHasPendingSIUHIAnalysisJob
    );

    return (
        <div>
            {/* 
            <div className='mb-2'>
                <div className='text-xs opacity-50 mb-1'>
                    <span>{t('output_service_name', { ns: APP_NAME })}</span>
                </div>
                <CalciteInputText />
            </div> */}

            <div
                className="mt-2"
                style={
                    {
                        '--calcite-button-border-color':
                            'var(--custom-light-blue-90)',
                        '--calcite-button-text-color':
                            'var(--custom-light-blue)',
                    } as React.CSSProperties
                }
            >
                {/* <CalciteButton
                    appearance="outline"
                    scale="m"
                    width="full"
                    iconStart="credits"
                    disabled={shouldDisableCreateJobButton}
                >
                    {t('get_estimate', { ns: APP_NAME })}
                </CalciteButton> */}

                <CalciteButton
                    appearance="outline"
                    scale="m"
                    width="full"
                    iconStart="plus"
                    disabled={
                        shouldDisableCreateJobButton ||
                        hasPendingSIUHIAnalysisJob
                    }
                    onClick={() => {
                        // Dispatch action to create new SIUHI analysis job
                        dispatch(createNewSIUHIAnalysisJob());
                    }}
                >
                    {t('create_new_job', { ns: APP_NAME })}
                </CalciteButton>

                {failedToCreateJobErrorMessage && (
                    <CalciteButton
                        appearance="outline"
                        scale="s"
                        width="full"
                        className="mt-2"
                        onClick={() => {
                            // Clear the error message when user clicks to dismiss
                            dispatch(urbanHeatIslandToolFiltersReset());
                        }}
                    >
                        {t('reset', { ns: APP_NAME })}
                    </CalciteButton>
                )}
            </div>

            {failedToCreateJobErrorMessage && (
                <>
                    <div className="mt-2 text-red-500 flex ">
                        <p className="font-medium text-xs">
                            {t('failed_to_create_new_job', {
                                ns: APP_NAME,
                                errorMessage: failedToCreateJobErrorMessage,
                            })}
                        </p>
                    </div>
                </>
            )}

            {hasPendingSIUHIAnalysisJob && (
                <div className="mt-1 flex ">
                    <p className="opacity-50 text-xs">
                        {t('pending_job_exists', {
                            ns: APP_NAME,
                        })}
                    </p>
                </div>
            )}
        </div>
    );
};
