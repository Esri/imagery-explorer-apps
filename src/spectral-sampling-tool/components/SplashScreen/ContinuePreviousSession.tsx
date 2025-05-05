import { Button } from '@shared/components/Button';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectClassifictionNameOfSpectralSamplingTask,
    selectTargetService,
} from '@shared/store/SpectralSamplingTool/selectors';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ContinuePreviousSession = () => {
    const { t } = useTranslation();

    const targetService = useAppSelector(selectTargetService);

    const sessionName = useAppSelector(
        selectClassifictionNameOfSpectralSamplingTask
    );

    const previousSession = false;

    return (
        <div className="w-full">
            <div className="opacity-50 mb-4">
                {previousSession ? (
                    <>
                        <h4>
                            {t('continue_previous_session', { ns: APP_NAME })}
                        </h4>
                        <h4 className="italic">
                            {targetService} | {sessionName}
                        </h4>
                    </>
                ) : (
                    <h4>{t('no_previous_session', { ns: APP_NAME })}</h4>
                )}
            </div>

            {previousSession && (
                <div>
                    <Button
                        onClickHandler={() => {
                            console.log(
                                'Continue previous session button clicked'
                            );
                        }}
                        scale="s"
                        disabled={!previousSession}
                    >
                        {t('continue_previous_session', { ns: APP_NAME })}
                    </Button>
                </div>
            )}
        </div>
    );
};
