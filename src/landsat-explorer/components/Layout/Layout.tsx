import React from 'react';
import BottomPanel from '@shared/components/BottomPanel/BottomPanel';
import { Calendar } from '@shared/components/Calendar';
import { AppHeader } from '@shared/components/AppHeader';
import {
    ContainerOfSecondaryControls,
    ModeSelector,
} from '@shared/components/ModeSelector';
import { SceneInfo } from '../SceneInfo';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '@shared/store/ImageryScene/selectors';
import { AnimationControl } from '@shared/components/AnimationControl';
import { AnalysisToolSelector } from '@shared/components/AnalysisToolSelector';
import { TrendTool } from '../TrendTool';
import { MaskTool } from '../MaskTool';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { DynamicModeInfo } from '@shared/components/DynamicModeInfo';
import { SpectralTool } from '../SpectralTool';
import { ChangeCompareLayerSelector } from '@shared/components/ChangeCompareLayerSelector';
import { ChangeCompareTool } from '../ChangeCompareTool';
import { appConfig } from '@shared/config';
import { useQueryAvailableLandsatScenes } from '@landsat-explorer/hooks/useQueryAvailableLandsatScenes';
import { LandsatRasterFunctionSelector } from '../RasterFunctionSelector';
import { LandsatInterestingPlaces } from '../InterestingPlaces';

const Layout = () => {
    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const dynamicModeOn = mode === 'dynamic';

    const shouldShowSecondaryControls =
        mode === 'swipe' || mode === 'animate' || mode === 'analysis';

    /**
     * This custom hook gets invoked whenever the acquisition year, map center, or selected landsat missions
     * changes, it will dispatch the query that finds the available landsat scenes.
     */
    useQueryAvailableLandsatScenes();

    useSaveAppState2HashParams();

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader title={appConfig.title} />
                <BottomPanel>
                    <div className="mx-auto">
                        <DynamicModeInfo />
                        <LandsatInterestingPlaces />
                        <LandsatRasterFunctionSelector />
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
                    <ModeSelector />

                    {shouldShowSecondaryControls && (
                        <ContainerOfSecondaryControls>
                            <SwipeLayerSelector />
                            <AnimationControl />
                            <AnalysisToolSelector />
                        </ContainerOfSecondaryControls>
                    )}

                    {mode === 'analysis' && analysisTool === 'change' && (
                        <ContainerOfSecondaryControls>
                            <ChangeCompareLayerSelector />
                        </ContainerOfSecondaryControls>
                    )}
                </div>

                <div className="flex flex-grow justify-center shrink-0">
                    {dynamicModeOn ? (
                        <>
                            <DynamicModeInfo />
                            <LandsatInterestingPlaces />
                        </>
                    ) : (
                        <>
                            <div className="ml-2 3xl:ml-0">
                                <Calendar />
                            </div>

                            {mode === 'analysis' && (
                                <div className="analyze-tool-and-scene-info-container">
                                    <MaskTool />
                                    <TrendTool />
                                    <SpectralTool />
                                    <ChangeCompareTool />
                                </div>
                            )}

                            <SceneInfo />
                        </>
                    )}

                    <LandsatRasterFunctionSelector />
                </div>
            </BottomPanel>
        </>
    );
};

export default Layout;
