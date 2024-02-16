import './ControlPanel.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { year4LeadingLayerUpdated } from '@landcover-explorer/store/Map/reducer';
import ChangeCompareGraph from './LandCoverGraph/ChangeCompareGraph/ChangeCompareGraphContainer';
import ClassificationsList from './ClassificationsList/ClassificationsListContainer';
import LayerSelector from './LayerSelector/LayerSelectorContainer';
import TimeSlider from './TimeSlider/TimeSliderContainer';
import { selectShouldShowSentinel2Layer } from '@landcover-explorer/store/Map/selectors';
import Tooltip from './Tooltip/TooltipContainer';
import ToggleButton from './ToggleButton/ToggleButtonContainer';
import { selectShouldHideControlPanel } from '@landcover-explorer/store/UI/selectors';
import ActionBar from './ActionBar/ActionBar';
import Sentinel2LayerRasterFunctionsList from './Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import LandCoverGraph from './LandCoverGraph/LandCoverGraphContainer';

const ControlPanel = () => {
    // const dispatch = useDispatch();

    const hideControlPanel = useSelector(selectShouldHideControlPanel);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    return (
        <>
            {hideControlPanel === false && (
                <div className="control-panel absolute bottom-0 left-0 w-full h-bottom-panel-height z-10">
                    <div className="theme-background absolute top-0 left-0 w-full h-full"></div>
                    <div className="control-panel-top-shadow absolute top-0 left-0 w-full"></div>

                    <div className="relative w-full h-full p-2 pt-4 xl:flex text-custom-light-blue justify-around z-10 overflow-y-auto xl:overflow-y-unset">
                        <div className="flex">
                            <LayerSelector />
                            <TimeSlider />
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

                    <Tooltip />

                    {/* <ActionBar /> */}
                </div>
            )}

            <ToggleButton />
        </>
    );
};

export default ControlPanel;
