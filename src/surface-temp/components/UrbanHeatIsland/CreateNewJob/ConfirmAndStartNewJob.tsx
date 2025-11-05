import { CalciteButton } from '@esri/calcite-components-react';
import { APP_NAME } from '@shared/config';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ConfirmAndStartNewJob = () => {
    const { t } = useTranslation();
    return (
        <div>
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
            </div>
        </div>
    );
};
