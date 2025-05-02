import { Button } from '@shared/components/Button';
import { APP_NAME } from '@shared/config';
import { SpectralSamplingToolSupportedService } from '@shared/store/SpectralSamplingTool/reducer';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const CreateNewSession = () => {
    const { t } = useTranslation();

    const [targetService, setTargetService] =
        React.useState<SpectralSamplingToolSupportedService>(null);

    const [sessionName, setSessionName] = React.useState<string>(null);

    return (
        <div>
            <div className="opacity-50 mb-4">
                <h4>{t('create_new_session_header', { ns: APP_NAME })}</h4>
            </div>
            <div>
                <Button
                    onClickHandler={() => {
                        console.log('Create new session button clicked');
                    }}
                    scale="s"
                    disabled={!targetService || !sessionName}
                >
                    {t('create_new_session', { ns: APP_NAME })}
                </Button>
            </div>
        </div>
    );
};
