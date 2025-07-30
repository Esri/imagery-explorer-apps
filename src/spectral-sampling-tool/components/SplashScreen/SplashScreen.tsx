import { SpectralSamplingToolSupportedService } from '@shared/store/SpectralSamplingTool/reducer';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SplashScreenHeader } from './SplashScreenHeader';
import { CreateNewSession } from './CreateNewSession';
import { ContinuePreviousSession } from './ContinuePreviousSession';
import { VerticalDivider } from './VerticalDivider';
import { SpectralSamplingToolSessionData } from '@shared/utils/indexedDB/sessioOfSpectralSamplingTool';
import { CalciteLoader } from '@esri/calcite-components-react';

type Pros = {
    isLoading: boolean;
    error?: string | null;
    createNewSessionButtonOnClick: (
        targetService: SpectralSamplingToolSupportedService,
        sessionName: string
    ) => void;
    /**
     * Emits when the user clicks on the continue previous session button.
     * @param previousSession
     * @returns
     */
    countinuePreviousSessionButtonOnClick: (
        previousSession: SpectralSamplingToolSessionData
    ) => void;
};

export const SplashScreen: FC<Pros> = ({
    isLoading,
    error,
    createNewSessionButtonOnClick,
    countinuePreviousSessionButtonOnClick,
}) => {
    const { t } = useTranslation();
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-custom-background-90 text-custom-light-blue z-50 backdrop-blur-sm md:flex justify-center overflow-y-auto fancy-scrollbar">
            <div className="mt-8 md:mt-32 mx-8">
                {isLoading && <CalciteLoader label={t('loading') + '...'} />}
                {error && (
                    <div className="text-red-500">
                        {t('failed_to_create_new_session', { error })}
                    </div>
                )}

                <SplashScreenHeader />

                <div className="relative md:flex items-stretch">
                    <div className="w-full md:w-[250px] shrink-0 grow-0">
                        <CreateNewSession
                            createNewSessionButtonOnClick={
                                createNewSessionButtonOnClick
                            }
                        />
                    </div>

                    <VerticalDivider />

                    <div className="w-full md:w-[250px] shrink-0 grow-0 md:my-0 my-8">
                        <ContinuePreviousSession
                            onClickHandler={
                                countinuePreviousSessionButtonOnClick
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
