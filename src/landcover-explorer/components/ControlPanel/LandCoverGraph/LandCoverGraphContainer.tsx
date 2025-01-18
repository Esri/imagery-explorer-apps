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

import React, { useMemo } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useSelector } from 'react-redux';
// import { MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM } from '@landcover-explorer/constants/map';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    // selectMapCenterAndZoom,
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectYear,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
import { showInfoPanelToggled } from '@shared/store/LandcoverExplorer/reducer';
import ChangeCompareGraph from './ChangeCompareGraph/ChangeCompareGraphContainer';
import HeaderText from '../HeaderText/HeaderText';
import TotalAreaGraph from './TotalAreaGraph/TotalAreaGraphContainer';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import classNames from 'classnames';

const LandCoverGraphContainer = () => {
    const dispatch = useAppDispatch();

    const mode = useSelector(selectMapMode);

    const isSentinel2LayerOutOfVisibleRange = useSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const animationMode = useSelector(selectAnimationStatus);

    const isAnimationControlVisible =
        animationMode !== undefined && animationMode !== null;

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const year = useSelector(selectYear);

    const shouldShowChart = useMemo(() => {
        if (animationMode) {
            return false;
        }

        if (shouldShowSentinel2Layer) {
            return isSentinel2LayerOutOfVisibleRange === false;
        }

        return true;
    }, [
        animationMode,
        shouldShowSentinel2Layer,
        isSentinel2LayerOutOfVisibleRange,
    ]);

    const getSubtitle = () => {
        if (mode === 'swipe') {
            return `from ${year4LeadingLayer} to ${year4TrailingLayer}`;
        }

        return `at ${year}`;
    };

    return (
        <div
            className={classNames(
                'text-center mx-6 w-auto 2xl:w-96',
                'pb-8 md:pb-0' // in mobile view, we need to add some padding space at the bottom because this component is the last one in the bottom panel
                // 'md:w-64': isAnimationControlVisible,
                // 'md:w-96': isAnimationControlVisible === false,
            )}
        >
            <HeaderText
                title={`${
                    mode === 'swipe' ? 'Land Cover Change' : 'Land Cover Totals'
                }`}
                expandButtonTooltip={'Expanded Summary Chart'}
                subTitle={getSubtitle()}
                expandButtonOnClick={() => {
                    dispatch(showInfoPanelToggled(true));
                }}
            />

            {shouldShowChart === false ? (
                <div className="w-full flex justify-center items-center text-sm opacity-50 mt-16">
                    {animationMode ? (
                        <p> Graph is disabled when animation is on</p>
                    ) : (
                        <p>
                            Zoom in to see Land Cover{' '}
                            {mode === 'swipe' ? 'Change' : 'Totals'} Graph
                        </p>
                    )}
                </div>
            ) : (
                <div className="w-full h-40">
                    {mode === 'swipe' ? (
                        <ChangeCompareGraph />
                    ) : (
                        <TotalAreaGraph />
                    )}
                </div>
            )}
        </div>
    );
};

export default LandCoverGraphContainer;
