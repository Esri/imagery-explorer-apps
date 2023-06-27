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
import { ProfileTool } from '../ProfileTool';
import { MaskTool } from '@shared/components/MaskTool';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';

const Layout = () => {
    const mode = useSelector(selectAppMode);

    const dynamicModeOn = mode === 'dynamic';

    useSaveAppState2HashParams();

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader title="Landsat Explorer" />
                <BottomPanel>
                    <div className="mx-auto">
                        <div className="mb-4">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nulla bibendum lectus at
                                fringilla aliquam. Mauris vel nulla tristique,
                                tincidunt dui ac, facilisis est. Integer
                                faucibus dignissim tempor. Sed hendrerit, libero
                                id commodo dapibus, erat mi pretium dolor, vel
                                lacinia nulla enim id lorem.
                            </p>
                        </div>
                        <RasterFunctionSelector />
                    </div>
                </BottomPanel>
            </>
        );
    }

    return (
        <>
            <AppHeader title="Landsat Explorer" />
            <BottomPanel>
                <div className="flex flex-shrink-0">
                    <ModeSelector />

                    {(mode === 'swipe' ||
                        mode === 'animate' ||
                        mode === 'analysis') && (
                        <ContainerOfSecondaryControls>
                            <SwipeLayerSelector />
                            <AnimationControl />
                            <AnalysisToolSelector />
                        </ContainerOfSecondaryControls>
                    )}
                </div>

                <div className="flex flex-grow justify-center shrink-0">
                    {dynamicModeOn && <RasterFunctionSelector />}

                    {dynamicModeOn === false && (
                        <>
                            <div className="ml-2 3xl:ml-0">
                                <Calendar />
                            </div>

                            <div className="flex shrink-0 ml-6 3xl:ml-16">
                                <RasterFunctionSelector />
                                <SceneInfo />
                            </div>

                            {mode === 'analysis' && (
                                <div className="ml-6 3xl:ml-16">
                                    <MaskTool />
                                    <ProfileTool />
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
