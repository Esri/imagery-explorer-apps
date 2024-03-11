/* Copyright 2024 Esri
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

import './ControlPanel.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { year4LeadingLayerUpdated } from '@shared/store/LandcoverExplorer/reducer';
// import ChangeCompareGraph from './LandCoverGraph/ChangeCompareGraph/ChangeCompareGraphContainer';
import ClassificationsList from './ClassificationsList/ClassificationsListContainer';
import LayerSelector from './LayerSelector/LayerSelectorContainer';
import { TimeSelector } from './TimeSlider';
import { selectShouldShowSentinel2Layer } from '@shared/store/LandcoverExplorer/selectors';
// import Tooltip from './Tooltip/TooltipContainer';
// import ToggleButton from './ToggleButton/ToggleButtonContainer';
// import { selectShouldHideControlPanel } from '@shared/store/LandcoverUI/selectors';
import Sentinel2LayerRasterFunctionsList from './Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import LandCoverGraph from './LandCoverGraph/LandCoverGraphContainer';
// import { selectHideBottomPanel } from '@shared/store/UI/selectors';
import BottomPanel from '@shared/components/BottomPanel/BottomPanel';
import { ModeSelector } from './ModeSelector';

const ControlPanel = () => {
    // const dispatch = useDispatch();

    // const hideControlPanel = useSelector(selectHideBottomPanel);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    return (
        <BottomPanel>
            <div className="relative w-full h-full p-2 xl:flex text-custom-light-blue justify-between">
                <div className="flex">
                    <LayerSelector />
                    <ModeSelector />
                    <TimeSelector />
                </div>

                <div className="flex flex-col-reverse md:flex-row pb-6 md:pb-0">
                    {shouldShowSentinel2Layer === false && (
                        <ClassificationsList />
                    )}

                    {shouldShowSentinel2Layer && (
                        <Sentinel2LayerRasterFunctionsList />
                    )}

                    <LandCoverGraph />
                </div>
            </div>
        </BottomPanel>
    );
};

export default ControlPanel;
