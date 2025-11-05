import {
    CalciteButton,
    CalciteInputText,
    CalciteLabel,
} from '@esri/calcite-components-react';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectShouldDisableCreateJobButton } from '@shared/store/UrbanHeatIslandTool/selectors';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ConfirmAndStartNewJob = () => {
    const { t } = useTranslation();

    const shouldDisableCreateJobButton = useAppSelector(
        selectShouldDisableCreateJobButton
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
                <CalciteButton
                    appearance="outline"
                    scale="m"
                    width="full"
                    iconStart="credits"
                    disabled={shouldDisableCreateJobButton}
                >
                    {t('get_estimate', { ns: APP_NAME })}
                </CalciteButton>

                <CalciteButton
                    appearance="outline"
                    scale="m"
                    width="full"
                    iconStart="plus"
                    disabled={shouldDisableCreateJobButton}
                    className="mt-2"
                >
                    {t('create_new_job', { ns: APP_NAME })}
                </CalciteButton>
            </div>
        </div>
    );
};
