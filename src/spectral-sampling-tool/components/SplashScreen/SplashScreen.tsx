import { SpectralSamplingToolSupportedService } from '@shared/store/SpectralSamplingTool/reducer';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type Pros = {
    isLoading: boolean;
    error?: string | null;
    createNewSessionButtonOnClick: (
        targetService: SpectralSamplingToolSupportedService | null,
        sessionName: string | null
    ) => void;
};

export const SplashScreen: FC<Pros> = ({
    isLoading,
    error,
    createNewSessionButtonOnClick,
}) => {
    const { t } = useTranslation();
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-custom-background-90 text-custom-light-blue z-50 backdrop-blur-sm flex items-center justify-center">
            <div className="max-w-3xl mx-8">
                {isLoading && <calcite-loader label={t('loading') + '...'} />}
                {error && (
                    <div className="text-red-500">
                        {t('failed_to_create_new_session', { error })}
                    </div>
                )}

                <div
                    onClick={createNewSessionButtonOnClick.bind(
                        null,
                        'landsat',
                        'foobar'
                    )}
                >
                    new landsat session
                </div>
                <div
                    onClick={createNewSessionButtonOnClick.bind(
                        null,
                        'sentinel-2',
                        'foobar'
                    )}
                >
                    new sentinel-2 session
                </div>
            </div>
        </div>
    );
};
