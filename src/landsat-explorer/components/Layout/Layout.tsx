import React from 'react';
import BottomPanel from '@shared/components/BottomPanel/BottomPanel';
import { RasterFunctionSelector } from '@shared/components/RasterFunctionSelector';
import { Calendar } from '@shared/components/Calendar';
import { AppHeader } from '@shared/components/AppHeader';
import {
    ContainerOfSecondaryControls,
    ModeSelector,
} from '@shared/components/ModeSelector';
import { SceneInfo } from '../SceneInfo';
import { useSelector } from 'react-redux';
import { selectAppMode } from '@shared/store/Landsat/selectors';
import { AnimationControl } from '@shared/components/AnimationControl';
import { AnalysisToolSelector } from '@shared/components/AnalysisToolSelector';
import { TrendTool } from '../TrendTool';
import { MaskTool } from '../MaskTool';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { DynamicModeInfo } from '@shared/components/DynamicModeInfo';
import { InterestingPlaces } from '@shared/components/InterestingPlaces';
import { LANDSAT_EXPLORER_APP_TITLE } from '@shared/constants';
import { SpectralTool } from '../SpectralTool';

const DynamicModeContent = () => {
    return (
        <>
            <DynamicModeInfo />
            <InterestingPlaces />
            <RasterFunctionSelector />
        </>
    );
};

const Layout = () => {
    const mode = useSelector(selectAppMode);

    const dynamicModeOn = mode === 'dynamic';

    const shouldShowSecondaryControls =
        mode === 'swipe' || mode === 'animate' || mode === 'analysis';

    useSaveAppState2HashParams();

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader title={LANDSAT_EXPLORER_APP_TITLE} />
                <BottomPanel>
                    <div className="mx-auto">
                        <DynamicModeContent />
                    </div>
                </BottomPanel>
            </>
        );
    }

    return (
        <>
            <AppHeader title={LANDSAT_EXPLORER_APP_TITLE} />
            <BottomPanel>
                <div className="flex flex-shrink-0">
                    <ModeSelector />

                    {shouldShowSecondaryControls && (
                        <ContainerOfSecondaryControls>
                            <SwipeLayerSelector />
                            <AnimationControl />
                            <AnalysisToolSelector />
                        </ContainerOfSecondaryControls>
                    )}
                </div>

                <div className="flex flex-grow justify-center shrink-0">
                    {dynamicModeOn ? (
                        <DynamicModeContent />
                    ) : (
                        <>
                            <div className="ml-2 3xl:ml-0">
                                <Calendar />
                            </div>

                            {mode === 'analysis' && (
                                <div className="mx-6 3xl:mx-16">
                                    <MaskTool />
                                    <TrendTool />
                                    <SpectralTool />
                                </div>
                            )}

                            <div className="flex shrink-0">
                                <SceneInfo />
                                <RasterFunctionSelector />
                            </div>
                        </>
                    )}
                </div>
            </BottomPanel>
        </>
    );
};

export default Layout;
