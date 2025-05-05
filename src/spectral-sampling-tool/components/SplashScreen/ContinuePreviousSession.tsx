import { Button } from '@shared/components/Button';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectClassifictionNameOfSpectralSamplingTask,
    selectTargetService,
} from '@shared/store/SpectralSamplingTool/selectors';
import { SpectralSamplingToolSessionData } from '@shared/utils/indexedDB/sessioOfSpectralSamplingTool';
import { useRetrievePreviousSession } from '@spectral-sampling-tool/hooks/useRetrievePreviousSession';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type ContinuePreviousSessionProps = {
    onClickHandler: (previousSession: SpectralSamplingToolSessionData) => void;
};

export const ContinuePreviousSession: FC<ContinuePreviousSessionProps> = ({
    onClickHandler,
}) => {
    const { t } = useTranslation();

    const previousSession = useRetrievePreviousSession();

    return (
        <div className="w-full">
            <div className="opacity-50 mb-4">
                <h4>{t('continue_previous_session', { ns: APP_NAME })}</h4>

                {previousSession ? (
                    <h4 className="italic text-sm">
                        {previousSession?.targetService} |{' '}
                        {previousSession?.sessionName}
                    </h4>
                ) : (
                    <h4 className="italic mt-4 text-sm">
                        {t('no_previous_session', { ns: APP_NAME })}
                    </h4>
                )}
            </div>

            {previousSession && (
                <div>
                    <Button
                        onClickHandler={() => {
                            // console.log(
                            //     'Continue previous session button clicked',
                            //     previousSession
                            // );
                            onClickHandler(previousSession);
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
