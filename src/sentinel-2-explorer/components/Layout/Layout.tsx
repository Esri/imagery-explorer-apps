/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect } from 'react';
import BottomPanel from '@shared/components/BottomPanel/BottomPanel';
import { Calendar } from '@shared/components/Calendar';
import { AppHeader } from '@shared/components/AppHeader';
import {
    ContainerOfSecondaryControls,
    ModeSelector,
} from '@shared/components/ModeSelector';

import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '@shared/store/ImageryScene/selectors';
import { AnimationControl } from '@shared/components/AnimationControl';

// import { TrendTool } from '../TemporalProfileTool';
// import { MaskTool } from '../MaskTool';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
// import { SpectralTool } from '../SpectralTool';
import { ChangeCompareLayerSelector } from '@shared/components/ChangeCompareLayerSelector';
import { APP_NAME, appConfig } from '@shared/config';
// import { LandsatRasterFunctionSelector } from '../RasterFunctionSelector';
// import { LandsatInterestingPlaces } from '../InterestingPlaces';
// import { AnalyzeToolSelector4Landsat } from '../AnalyzeToolSelector/AnalyzeToolSelector';
import { useShouldShowSecondaryControls } from '@shared/hooks/useShouldShowSecondaryControls';
import { CloudFilter } from '@shared/components/CloudFilter';
import { Sentinel2DynamicModeInfo } from '../Sentinel2DynamicModeInfo/Sentinel2DynamicModeInfo';
import { Sentinel2RasterFunctionSelector } from '../RasterFunctionSelector';
import { useQueryAvailableSentinel2Scenes } from '../../hooks/useQueryAvailableSentinel2Scenes';
import { SceneInfo } from '../SceneInfo';
import { Sentinel2AnalyzeToolSelector } from '../AnalyzeToolSelector/AnalyzeToolSelector';
import { Sentinel2MaskTool } from '../MaskTool';
import { Sentinel2ChangeCompareTool } from '../ChangeCompareTool';
import { Sentinel2SpectralProfileTool } from '../SpectralProfileTool';
import { Sentinel2TemporalProfileTool } from '../Sentinel2TemporalProfileTool/Sentinel2TemporalProfileTool';
import { Sentinel2SavePanel } from '../Sentinel2SavePanel';
import { Sentinel2InterestingPlaces } from '../Sentinel2InterestingPlaces';
import { useTranslation } from 'react-i18next';
import { ProjectsList } from '@shared/components/ProjectsList/ProjectsList';
import { BookmarksList } from '../BookmarksList/BookmarksList';
import CompositeCalendar from '@shared/components/CompositeCalendar/CompositeCalendarContainer';
import { CompositeModeSelector } from '@shared/components/CompositeModeSelector/CompositeModeSelector';
import { CompositeInfoContainer } from '../CompositeInfo/CompositeInfoContainer';
import { GenerateCompositeButton } from '@shared/components/GenerateCompositeButton/GenerateCompositeButton';
import { showCompositeLayerChanged } from '@shared/store/ImageryScene/reducer';
import { useFetchCustomRenderers } from '@shared/hooks/useFetchCustomRenderers';

const Layout = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectAppMode);

    // Fetch custom renderers when user logs in
    useFetchCustomRenderers();

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    // Hide composite layer when exiting composite mode
    useEffect(() => {
        if (mode !== 'composite') {
            dispatch(showCompositeLayerChanged(false));
        }
    }, [mode, dispatch]);

    const dynamicModeOn = mode === 'dynamic';

    const bookmarksModeOn = mode === 'bookmarks';

    const compositeModeOn = mode === 'composite';

    const shouldShowSecondaryControls = useShouldShowSecondaryControls();

    /**
     * This custom hook gets invoked whenever the acquisition year, map center
     * changes, it will dispatch the query that finds the available sentinel-2 scenes.
     */
    useQueryAvailableSentinel2Scenes();

    useSaveAppState2HashParams();

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader />
                <BottomPanel>
                    <div className="mx-auto">
                        <Sentinel2DynamicModeInfo />
                        <Sentinel2InterestingPlaces />
                        <Sentinel2RasterFunctionSelector />
                    </div>
                </BottomPanel>
            </>
        );
    }

    return (
        <>
            <AppHeader />
            <BottomPanel>
                <div className="flex flex-shrink-0">
                    <ModeSelector />

                    {shouldShowSecondaryControls && (
                        <ContainerOfSecondaryControls>
                            <SwipeLayerSelector />
                            <AnimationControl />
                            <Sentinel2AnalyzeToolSelector />
                        </ContainerOfSecondaryControls>
                    )}

                    {mode === 'analysis' && analysisTool === 'change' && (
                        <ContainerOfSecondaryControls>
                            <ChangeCompareLayerSelector />
                        </ContainerOfSecondaryControls>
                    )}

                    {bookmarksModeOn && (
                        <ContainerOfSecondaryControls>
                            <ProjectsList />
                        </ContainerOfSecondaryControls>
                    )}
                </div>

                <div className="flex flex-grow shrink-0">
                    <div className="flex flex-grow justify-center">
                        {dynamicModeOn ? (
                            <>
                                <Sentinel2DynamicModeInfo />
                                <Sentinel2InterestingPlaces />
                            </>
                        ) : bookmarksModeOn ? (
                            <BookmarksList />
                        ) : compositeModeOn ? (
                            <>
                                <div className="ml-2 3xl:ml-0">
                                    <CompositeCalendar>
                                        <CloudFilter />
                                    </CompositeCalendar>
                                    <div className="mt-2 flex gap-2">
                                        <GenerateCompositeButton />
                                        <CompositeModeSelector />
                                    </div>
                                </div>

                                <CompositeInfoContainer />
                            </>
                        ) : (
                            <>
                                <div className="ml-2 3xl:ml-0">
                                    <Calendar>
                                        <CloudFilter />
                                    </Calendar>
                                </div>

                                {mode === 'analysis' && (
                                    <div className="analyze-tool-and-scene-info-container">
                                        <Sentinel2MaskTool />
                                        <Sentinel2TemporalProfileTool />
                                        <Sentinel2SpectralProfileTool />
                                        <Sentinel2ChangeCompareTool />
                                    </div>
                                )}

                                <SceneInfo />
                            </>
                        )}
                    </div>

                    <div className="flex-shrink-0 mr-4">
                        <Sentinel2RasterFunctionSelector />
                    </div>
                </div>
            </BottomPanel>
            <Sentinel2SavePanel />
        </>
    );
};

export default Layout;
