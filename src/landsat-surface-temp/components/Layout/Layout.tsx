import React from 'react';
import BottomPanel from '@shared/components/BottomPanel/BottomPanel';
import { Calendar } from '@shared/components/Calendar';
import { AppHeader } from '@shared/components/AppHeader';
import { useSelector } from 'react-redux';

import { MaskTool } from '../MaskTool';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { appConfig } from '@shared/config';
import { selectAppMode } from '@shared/store/ImageryScene/selectors';
import { TrendTool } from '../TrendTool';
import { LandsatSurefaceTempModeSelector } from '../ModeSelector';
import { DynamicModeInfo } from '../DynamicModeInfo/DynamicModeInfo';

const Layout = () => {
    const mode = useSelector(selectAppMode);

    const dynamicModeOn = mode === 'dynamic';

    useSaveAppState2HashParams();

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader title={appConfig.title} />
                <BottomPanel>
                    <div className="mx-auto">
                        <DynamicModeInfo />
                    </div>
                </BottomPanel>
            </>
        );
    }

    return (
        <>
            <AppHeader title={appConfig.title} />
            <BottomPanel>
                <div className="flex flex-shrink-0">
                    <LandsatSurefaceTempModeSelector />
                </div>

                <div className="flex flex-grow justify-center shrink-0">
                    {dynamicModeOn && <DynamicModeInfo />}

                    {dynamicModeOn === false && (
                        <>
                            <div className="ml-2 3xl:ml-0">
                                <Calendar />
                            </div>

                            {mode === 'analysis' && (
                                <div className="ml-6 3xl:ml-16">
                                    <MaskTool />
                                    <TrendTool />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </BottomPanel>
        </>
    );
};

export default Layout;
