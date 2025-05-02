import { SpectralSamplingToolSupportedService } from '@shared/store/SpectralSamplingTool/reducer';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SplashScreenHeader } from './SplashScreenHeader';
import { CreateNewSession } from './CreateNewSession';
import { ContinuePreviousSession } from './ContinuePreviousSession';
import { VerticalDivider } from './VerticalDivider';

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
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-custom-background-90 text-custom-light-blue z-50 backdrop-blur-sm md:flex justify-center">
            <div className="mt-8 md:mt-32 mx-8">
                {isLoading && <calcite-loader label={t('loading') + '...'} />}
                {error && (
                    <div className="text-red-500">
                        {t('failed_to_create_new_session', { error })}
                    </div>
                )}

                <SplashScreenHeader />

                <div className="relative md:flex items-stretch ">
                    <div className="w-full md:w-[250px] shrink-0 grow-0 h-[300px]">
                        <CreateNewSession />
                    </div>

                    <VerticalDivider />

                    <div className="w-full md:w-[250px] shrink-0 grow-0 ">
                        <ContinuePreviousSession />
                    </div>
                </div>
            </div>
        </div>
    );
};
